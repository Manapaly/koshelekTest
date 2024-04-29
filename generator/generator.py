from itertools import product
from data.data import Person


def generated_person(username, mail, password, ref_code, politics):
    return Person(
        user_name=username,
        mail=mail,
        password=password,
        ref_code=ref_code,
        politics=politics
    )
def generated_data():
    valid_user_name = 'Username'
    valid_email = 'email@mail.ru'
    valid_password = 'Qwerty123!'
    valid_ref_code = 'refcode'
    agree_with_politics = 'clicked'

    invalid_user_name = 'Us'
    invalid_email = 'emailmail.ru'
    invalid_password = 'qwerty1'
    invalid_ref_code = 'rr'
    disagree_with_politics = 'not clicked'

    empty_user_name = ''
    empty_email = ''
    empty_password = ''

    generate_variations = lambda: list(product(
        [valid_user_name, invalid_user_name, empty_user_name],  # Варианты для user_name
        [valid_email, invalid_email, empty_email],  # Варианты для email
        [valid_password, invalid_password, empty_password],  # Варианты для password
        [valid_ref_code, invalid_ref_code],  # Варианты для ref_code
        [agree_with_politics, disagree_with_politics]  # Варианты для agree_with_politics
    ))

    data_variations = generate_variations()

    return data_variations
