'use strict'

const url = new URL(location)
url.hostname = 'www.google.co.jp'
location.replace(url)
