// const { default: Moralis } = require("moralis/types");


// CEX
const serverUrl = "https://bbp7pvunemun.usemoralis.com:2053/server";
const appId = "nsHcPxcjIR90QFsk0cwyJ8UyvE0VsuANxG0gTDER";
Moralis.initialize(appId);
Moralis.start({ serverUrl, appId });


$("#search").click(search);
$("#seeAll").click(getOwners);

async function getOwners () {
    const options = {
        address: "0x4008f13addd10f08b66f0d8e88849c3f34fed0af",
        chain: "eth"
    };
    const result = await Moralis.Web3API.token.getNFTOwners(options);
    console.log(result);
    let show = 0;
    for(let i = result.result.length - 1; i >= 0; i--) {
        let q = new Moralis.Query('Signups');
        q.equalTo('ethAddress', result.result[i].owner_of);
        let r = await q.find();
        let email = 'none';
        if(r.length > 0) {
            email = r[0].attributes.email;
        }
        document.getElementsByTagName('div')[show].innerHTML = '</br>Token ID: ' + result.result[i].token_id + ' <br/>Owner: ' + result.result[i].owner_of + '<br/>' + 'Email: ' + email;
        show++;
    }
}

async function search () {
    const options = {
        address: "0x4008f13addd10f08b66f0d8e88849c3f34fed0af",
        chain: "eth"
    };
    for(let i = 0; i < 100; i ++) {
        document.getElementsByTagName('div')[i].innerHTML = '';

    }
    const result = await Moralis.Web3API.token.getNFTOwners(options);
    let id = document.getElementById('id').value;
    for(let i = 0; i < result.result.length; i++) {
        if(result.result[i].token_id == id) {
            document.getElementsByTagName('div')[0].innerHTML = '</br>Token ID: ' + result.result[i].token_id + ' <br/>Owner: ' + result.result[i].owner_of + '<br/>';
            break;
        }
    }

}
   

    

