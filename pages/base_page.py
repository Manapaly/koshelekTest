from selenium.webdriver.support.ui import WebDriverWait as Wait
from selenium. webdriver.support import expected_conditions as EC
from locators.sign_up_page_locators import SignUpPageLocators as Locators
class BasePage:

    def __init__(self, driver, url):
        self.driver = driver
        self.url = url

    def open(self):
        self.driver.get(self.url)

    def work_with_shadow_root(self):
        self.driver = self.driver.execute_script('return arguments[0].shadowRoot',
                              self.driver.find_element(*Locators.SHADOW_ELEMENT))

    def element_is_visible(self, locator, timeout=5):
        return self.driver.find_element(*locator)


    def elements_are_visible(self, locator, timeout=5):
        return Wait(self.driver, timeout).until(EC.visibility_of_all_elements_located(locator))

