require('dotenv').config()
require('./db/db')

const { CryptoPay, Assets, PaidButtonNames } = require('@foile/crypto-pay-api')
const { Telegraf, TelegrafContext } = require('telegraf')
const {MenuTemplate, MenuMiddleware} = require('telegraf-inline-menu')

const cryptoPay = new CryptoPay(process.env.PAYMENT_TOKEN, {
  hostname: 'testnet-pay.crypt.bot',
  protocol: 'https'
})

/*bot.on('message', msg => {
  const chatId = msg.chat.id

	if (msg.text.startsWith('/')) {
		const command = msg.text.substring(1, msg.text.length)

		console.log(command)

		cryptoPay.createInvoice(Assets.TON, 100, {
			description: 'toker tokens',
			paid_btn_name: PaidButtonNames.VIEW_ITEM,
			paid_btn_url: 'https://google.com',
		}).then(data => {
			bot.sendMessage(chatId, data.pay_url)
		})
	}
})

bot.on('polling_error', error => {
	console.error('ok', error)
})*/

const bot = new Telegraf(process.env.BOT_TOKEN)

const menuTemplate = new MenuTemplate(ctx => `Hey ${ctx.from.first_name}!`)

menuTemplate.interact('I am excited!', 'a', {
	do: async ctx => {
		await ctx.reply('As am I!')
		return true
	}
})

const menuMiddleware = new MenuMiddleware('/', menuTemplate)
bot.command('start', ctx => menuMiddleware.replyToContext(ctx))
bot.use(menuMiddleware)

bot.launch()

cryptoPay.on('invoice_paid', update => {
	console.log(update.payload)
})