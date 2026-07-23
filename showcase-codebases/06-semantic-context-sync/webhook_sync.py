from fastapi import FastAPI, Request
import subprocess

app = FastAPI()

@app.post("/webhook/docs-update")
async def docs_update(request: Request):
    payload = await request.json()
    if payload.get("ref") == "refs/heads/main":
        print("Detected main branch update. Pulling latest docs...")
        subprocess.run(["git", "pull", "origin", "main"])
        
        print("Re-running semantic embedding pipeline...")
        subprocess.run(["python", "scripts/embed_docs.py"])
        
        return {"status": "success", "message": "Context synced!"}
    return {"status": "ignored"}
