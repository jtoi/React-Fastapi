# main.py
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.routers.users import auth
from app.routers.users import user
from app.routers.users import group
from app.routers.comercio import comercio


app = FastAPI(debug=True)

origins = [
    "http://localhost:3000",
    "http://192.168.1.135:3000",
    # Add more origins here
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user.router)
app.include_router(group.router)
app.include_router(comercio.router)
app.include_router(auth.router, prefix="/auth")
app.mount("/static", StaticFiles(directory="app/static"), name="static")  # Ajusta la ruta aquí


# if __name__ == "__main__":
#     uvicorn.run(app, host="0.0.0.0", port=8000)