# View and send your crypto kitties

to run the app locally:
`npm i`
`npm run dev`
open http://localhost:8000/ in browser

You need to be logged into Metamask to use the full functionality.

Tech stack: next.js, React, mobx, web3, ethereum

/components/Layout.js - wrapper for all other components. Cats are fetched here.

User Flow:

1.  on initial page visit, your cryptoKitties for your logged-in metamask account are fetched. If not logged in, site is read only.
2.  use input bar to see cats at an arbitrary address
3.  if your metamask account address matches the address of the displayed cats, then you will be able to send a cat to another address
4.  My Transactions displays the cat's you have sent from your metamask account

Tech Notes:

1.  localStorage is connected through Mobx so that components will rerender when local storage changes.
