# View and send your crypto kitties

to run the app locally:
`npm i`
`npm run dev`
open http://localhost:8000/ in browser

You need to be logged into Metamask to use the full functionality.

Tech stack: next.js, React, mobx, web3, ethereum

/components/Layout.js - wrapper for all other components.

1.  on initial page visit, your cryptoKitties for your logged-in metamask account are fetched
2.  use input bar to see cats at an arbitrary address
3.  if your metamask account address matches the address of the displayed cats, then you will be able to send a cat to another address
4.  My Transactions displays the cat's you have sent for your logged-in metamask account
