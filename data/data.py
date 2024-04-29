from dataclasses import dataclass

@dataclass
class Person:
    user_name: str = None
    mail: str = None
    password: str = None
    ref_code: str = None
    politics: str = None
