require('dotenv').config();

exports.Config = {
  
  ADMIN:
    process.env.NODE_ENV == 'production'
      ? process.env.ADMIN
      : process.env.ADMIN_TEST,
  
  ADMIN_PASS:
    process.env.NODE_ENV == 'production'
      ? process.env.ADMIN_PASS
      : process.env.ADMIN_PASS_TEST,
  
  CONTRACTADDR:
    process.env.NODE_ENV == 'production'
      ? process.env.CONTRACTADDR
      : process.env.CONTRACTADDR_TEST,

  OPERATIONSADDR:
    process.env.NODE_ENV == 'production'
      ? process.env.OPERATIONSADDR
      : process.env.OPERATIONSADDR_TEST,
  
  BLOCKCHAINSERV:
    process.env.NODE_ENV == 'production'
      ? process.env.BLOCKCHAINSERV
      : process.env.BLOCKCHAINSERV_TEST,
  
  DEPLOYEDCONTRACT:
    process.env.APPENV == 'production'
      ? process.env.CONTRACTADDR :
      process.env.TEST_CONTRACTADDR,

  DEPLOYEDNFTCONTRACT:
    process.env.NODE_ENV == 'production'
      ? process.env.NFTCONTRACTADDR 
      : process.env.NFTCONTRACTADDR_TEST,

  RELAY_GASLESS_API:
    process.env.NODE_ENV == 'production'
      ? process.env.RELAY_GASLESS_API_KEY
      : process.env.RELAY_GASLESS_API_KEY_TEST,
  
  RELAY_GASLESS_SECRET:
    process.env.NODE_ENV == 'production'
      ? process.env.RELAY_GASLESS_API_SECRET
      : process.env.RELAY_GASLESS_API_SECRET_TEST,

  WHITELISTDOMAINS: [
        "172.31.22.207",
        "https://172.31.22.207",
        "3.138.231.35",
        "https://3.138.231.35",
      ],

}
