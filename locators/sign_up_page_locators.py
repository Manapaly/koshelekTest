from selenium.webdriver.common.by import By

class SignUpPageLocators:
    SHADOW_ELEMENT = (By.CSS_SELECTOR, '.remoteComponent')
    USER_NAME = (By.CSS_SELECTOR, 'div[data-wi = "user-name"] > div > div > div > div:first-of-type > input')
    MAIL = (By.CSS_SELECTOR, 'div[data-wi = "identificator"] > div > div > div > div:first-of-type > input')
    PASSWORD = (By.ID, 'new-password')
    REF_CODE = (By.CSS_SELECTOR, 'div[data-wi = "referral"] > div > div > div > div:first-of-type > input')
    POLITICS = (By.CSS_SELECTOR, 'div[data-wi = "user-agreement"] > div > div > div > div:first-of-type > input')
    SUBMIT_BUTTON = (By.CSS_SELECTOR, 'div[data-wi = "submit-button"] > button')

    INPUT_RESULTS = (By.CSS_SELECTOR, 'div[class="v-messages__wrapper"]')
