import time

from conftest import driver
import pytest
from generator.generator import generated_data

from pages.sign_up_page import SignUpPage

link = 'https://koshelek.ru/authorization/signup'
class TestSignUpPage:
    input_variables = generated_data()

    @pytest.mark.parametrize('test_input', input_variables)
    def test_form(self, driver, test_input):
        sign_up_page = SignUpPage(driver, 'https://koshelek.ru/authorization/signup')
        sign_up_page.open()
        sign_up_page.work_with_shadow_root()
        person = sign_up_page.fill_fields_and_submit(*test_input)
        # time.sleep(1)
        result = sign_up_page.form_result()
        # print(result)
        if result[0] == '' and result[1] == '' and result[2] != 'Поле не заполнено' and result[2] != 'Пароль должен содержать минимум 8 символов' and result[3] != 'Неверный формат ссылки' and result[4]=='true':
            print('true')
            assert True, 'Все поля заполнены правильно'
        else:
            print('false')
            assert False, 'Вы ввели не правильный формат, попробуйте заново'