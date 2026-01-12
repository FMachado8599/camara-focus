import os
import datetime
import firebase_admin
from firebase_admin import credentials, firestore, storage

# ------------------
# CONFIG
# ------------------
SERVICE_ACCOUNT_FILE = "firebase-key.json"
LOCAL_EMOJI_DIR = "apple_emojis_png"
STORAGE_BASE_PATH = "emojis/apple"
VENDOR = "apple"
UNICODE_VERSION = "15.1"
BUCKET_NAME = "camara-focus.firebasestorage.app"

# ------------------
# INIT FIREBASE
# ------------------
cred = credentials.Certificate(SERVICE_ACCOUNT_FILE)
firebase_admin.initialize_app(cred, {
    "storageBucket": BUCKET_NAME
})

db = firestore.client()
bucket = storage.bucket()

# ------------------
# PARSE UNICODE METADATA
# ------------------
def load_unicode_metadata():
    meta = {}
    with open("emoji-test.txt", "r", encoding="utf-8") as f:
        for line in f:
            if line.startswith("#") or "fully-qualified" not in line:
                continue

            # Ejemplo:
            # 1F60D ; fully-qualified     # 😍 smiling face with heart-eyes
            try:
                left, right = line.split("#")
                emoji_and_name = right.strip()
                emoji, name = emoji_and_name.split(" ", 1)
                codepoints = left.split(";")[0].strip().lower()
                codepoint_key = "-".join(cp.lower() for cp in codepoints.split())

                meta[codepoint_key] = {
                    "emoji": emoji,
                    "name": name.strip()
                }
            except:
                continue
    return meta

unicode_meta = load_unicode_metadata()

# ------------------
# UPLOAD LOOP
# ------------------
for file in os.listdir(LOCAL_EMOJI_DIR):
    if not file.endswith(".png"):
        continue

    codepoint = file.replace(".png", "").lower()
    local_path = os.path.join(LOCAL_EMOJI_DIR, file)
    storage_path = f"{STORAGE_BASE_PATH}/{file}"
    doc_id = f"{VENDOR}_{codepoint}"

    print(f"Procesando {file}...")

    # ---------
    # STORAGE
    # ---------
    blob = bucket.blob(storage_path)

    if not blob.exists():
        blob.upload_from_filename(local_path, content_type="image/png")
        print("  ✓ Subido a Storage")
    else:
        print("  ↪ Ya existía en Storage")

    # ---------
    # FIRESTORE
    # ---------
    doc_ref = db.collection("emojis").document(doc_id)

    if doc_ref.get().exists:
        print("  ↪ Doc ya existía en Firestore")
        continue

    meta = unicode_meta.get(codepoint)

    data = {
        "emoji": meta["emoji"] if meta else None,
        "codepoint": codepoint,
        "name": meta["name"] if meta else None,
        "vendor": VENDOR,
        "imagePath": storage_path,
        "unicodeVersion": UNICODE_VERSION,
        "createdAt": datetime.datetime.utcnow().isoformat() + "Z"
    }

    doc_ref.set(data)
    print("  ✓ Doc creado en Firestore")

print("\n✔ Proceso terminado.")
