from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
import time
from bs4 import BeautifulSoup
import random


class messages_obtainer:
    def __init__(self, username, password):
        self.username = username
        self.password = password
        self.chromedriver_path = '/Users/luzalbaposse/.nvm/versions/node/v18.18.2/bin/chromedriver'
        self.chrome_options = Options()
        self.s = Service(self.chromedriver_path)
        self.driver = webdriver.Chrome(service=self.s, options=self.chrome_options)
        self.random_wait = random.randint(2, 8)
        self.login()

    def login(self):
        try:
            self.chrome_options.add_argument("--headless")  
            self.chrome_options.add_argument("--no-sandbox")
            self.chrome_options.add_argument("--disable-dev-shm-usage")

            self.driver.get("https://twitter.com/login")
            print("Página de inicio de sesión cargada")

            time.sleep(10)
            print("Esperando 10 segundos para cargar la página")

            username_field = self.driver.find_element(By.NAME, "text")
            time.sleep(self.random_wait)
            username_field.send_keys(self.username)
            print("Nombre de usuario ingresado")
            username_field.send_keys(Keys.RETURN)
            time.sleep(2)
            password_field = self.driver.find_element(By.NAME, "password")
            password_field.send_keys(self.password)
            time.sleep(self.random_wait)
            print("Contraseña ingresada")
            password_field.send_keys(Keys.RETURN)
            print("Iniciando sesión...")
        except Exception as e:
            print(f"Failed to log in: {e}")
            raise e


    def get_messages(self, user):
        start_time = time.time()
        time.sleep(self.random_wait)
        self.driver.get(f"https://x.com/search?q=(from%3A{user})%20until%3A2024-05-10%20since%3A2021-01-01%20-filter%3Alinks%20-filter%3Areplies&src=typed_query&f=live")
        # self.driver.get(f"https://x.com/search?q=from:{user}&src=typed_query&f=live")
        time.sleep(5)

        body = self.driver.find_element(By.TAG_NAME, "body")
        scrolling = True
        collected_tweets = set() 

        while scrolling:
            body.send_keys(Keys.PAGE_DOWN)
            time.sleep(2)
            page_source = self.driver.page_source
            soup = BeautifulSoup(page_source, 'html.parser')

   
            tweet_divs = soup.find_all('div', {
                'class': 'css-146c3p1 r-8akbws r-krxsd3 r-dnmrzs r-1udh08x r-bcqeeo r-1ttztb7 r-qvutc0 r-37j5jr r-a023e6 r-rjixqe r-16dba41 r-bnwqim',
                'data-testid': 'tweetText'
            })

            for tweet_div in tweet_divs:
                span = tweet_div.find('span', {
                    'class': 'css-1jxf684 r-bcqeeo r-1ttztb7 r-qvutc0 r-poiln3'
                })
                if span:
                    tweet_text = span.get_text()
                    collected_tweets.add(tweet_text)  

            print(f"Collected {len(collected_tweets)} tweets so far")
            if len(collected_tweets) > 30 or (time.time() - start_time > 15 and len(collected_tweets) == 0): 
                scrolling = False

        return list(collected_tweets) if collected_tweets else list("I was not posible to collect any tweet from this user")
