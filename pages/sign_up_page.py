from generator.generator import generated_person
from pages.base_page import BasePage
from locators.sign_up_page_locators import SignUpPageLocators as Locators

class SignUpPage(BasePage):


    def fill_fields_and_submit(self, *args):
        # print(*args[4].text)
        try:
            person = generated_person(args[0], args[1], args[2], args[3], args[4])
            self.element_is_visible(Locators.USER_NAME).send_keys(person.user_name)
            self.element_is_visible(Locators.MAIL).send_keys(person.mail)
            self.element_is_visible(Locators.PASSWORD).send_keys(person.password)
            self.element_is_visible(Locators.REF_CODE).send_keys(person.ref_code)
            if(person.politics == "clicked"):
                self.element_is_visible(Locators.POLITICS).click()
            self.element_is_visible(Locators.SUBMIT_BUTTON).click()
            return person
        except:
            assert "Регистрация не доступна, исправьте ошибки показаные на экране"

    def form_result(self):
        result_list = self.elements_are_visible(Locators.INPUT_RESULTS)
        result_text = [i.text for i in result_list]
        result_text.append(self.element_is_visible(Locators.POLITICS).get_attribute('aria-checked'))

        # for i in result_list:
        #     result_text.append(i.text)
        return result_text