const url = new URL(location.href)
url.hostname = 'www.google.co.jp'
location.replace(url)
