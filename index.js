require('dotenv').config()

const { CryptoPay, Assets, PaidButtonNames } = require('@foile/crypto-pay-api')
const TelegramBot = require('node-telegram-bot-api')

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true })

const cryptoPay = new CryptoPay(process.env.PAYMENT_TOKEN, {
  hostname: 'testnet-pay.crypt.bot',
  protocol: 'https'
})

bot.on('message', msg => {
  const chatId = msg.chat.id

	cryptoPay.createInvoice(Assets.TON, 100, {
		description: 'toker tokens',
		paid_btn_name: PaidButtonNames.VIEW_ITEM,
		paid_btn_url: 'http://placekitten.com/150',
	}).then(data => {
		console.log(data)
		bot.sendMessage(chatId, data.pay_url)
	})
})