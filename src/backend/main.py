from fastapi import FastAPI

app = FastAPI(title="Postgrados API")


@app.get("/hello")
def hello():
    return {"message": "Hola mundo"}
