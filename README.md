# Custom SFRA Gen AI E-commerce Prototypes

This repository contains three e-commerce prototypes that demonstrate Generative AI capabilities using Salesforce Einstein AI’s Prompt Builder within the Salesforce Commerce Cloud (SFRA) framework.

**Disclaimer** This package is intended to demonstrat and illustrate the Salesforce Einstein AI capabilties applied to e-commerce use cases on Salesforce Commerce Cloud (aka B2C Commerce).
It is not intended to be used in a production environment as is.

## Implemented Prototypes & Demos

**Natural Language Search** - Automatically switches to a Generative AI-powered search after typing 3 or more words ([Search Demo](https://org62.my.salesforce.com/sfc/p/000000000062/a/ed000000ApxJ/SDnJj1dvw4nWGPW0KVlEKRtHvgTFYzXk8uGIC0MaDcY)):

- `Natural_Language_Search`: Uses catalog CSV for search.
- `Vector_Search`: Searches against the Data Cloud Vector DB.

**Gift Finder** - Provides recommendations in 3 price ranges or groups ([Gift Finder Demo](https://org62.my.salesforce.com/sfc/p/000000000062/a/ed000000Apyv/TmyshzUuH_eT3kYJW0Oc91m2lu2_01sIvbR5eUHkD74)):

- `Gift_Finder`: sorts recommended products into 3 groups by price range.
- `Gift_Finder_Self_Grouping`: sorts recommended products into 3 groups determined by the LLM.

**Basket Check** - Compares a customer’s last 2 orders with their current basket to identify missing products ([Basket Check Demo](https://org62.my.salesforce.com/sfc/p/000000000062/a/ed000000Aq29/JkAuW8ux.iBBw9dxVWvsyp44tvfhic.XJtUNAKQBcb8)).

## Requirements

### Commerce Cloud

- SFRA version 7.0.1
- Services:
  - `salesforce.oauth.cred`: URL to the Salesforce Connect REST API for authentication.
  - `salesforce.connect.rest`: URL to the Salesforce Connect REST API for querying prompt templates.
- Custom Object:
  - `SFGenAIAuth`: to store the access token and expiration.

### Salesforce Core

- Licenses enabling Einstein AI capabilities
- Prompt Templates
- Connected App to enable Commerce Cloud to query the Connect REST API

## Approach & Limitations

For ease of implementation and demonstration, the prompt templates contain a sample of 200 master products from SFRA.
The products are represented in CSV format with the following attributes:
`ID`, `Product Name`, `Short Description`, `Price`, `Color Values`, `Size Values`

The resulting prompt template size is around 38000 characters.
Please keep in mind the Prompt Builder limits described here: https://help.salesforce.com/s/articleView?id=sf.prompt_builder_limits.htm&type=5

Alternative approaches can be implemented to limit prompt size, such as indexing the products into Salesforce Data Cloud's Vector Database, and querying the Vector DB from the prompt template at call time.

The Prompt Templates output JSON that is processed by a Commerce Cloud controller.

English and additional languages are supported as described here: https://help.salesforce.com/s/articleView?id=sf.prompt_builder_localize_responses.htm&type=5

## Configuration & Deployment

### Commerce Cloud

Deploy System Object Extensions, Custom Objects and Service definition:

- Connect to Business Manager
- Go to Administration > Site Development > Site Import & Export
- In the Import section, click "Choose File" and select the file `genai-configurations.zip` located in `custom_sfra_gen_ai/assets`
- Click "Upload"
- In the list of files, click the radio button next to `genai-configurations.zip`
- Click "Import"

Deploy the cartridge:

- Upload the cartridge `custom_sfra_gen_ai` to the WebDAV share containing your SFRA cartridges (eg. `SFRA_v701`).
- In Business Manager, go to Administration > Sites > Manage Sites
- Go the "Settings" tab, and click on the SFRA site (eg. `RefArchGlobal`)
- Add `custom_sfra_gen_ai` to the cartridge path, in front all the standard SFRA and plugin cartridges, eg.:
  `custom_sfra_gen_ai:plugin_cartridge_merge:plugin_instorepickup:plugin_wishlists:plugin_giftregistry:lib_productlist:plugin_productcompare:plugin_sitemap:plugin_applepay:plugin_datadownload:app_storefront_base`

### Salesforce Core

Create a Connected App:
Go to Setup > App Manager > Create Connected App:

- Name: Commerce Cloud Prompt Templates
- API name: Commerce_Cloud_Prompt_Templates
- Enable OAuth Settings: checked
- OAuth scopes:
  - Access Einstein GPT services (einstein_gpt_api)
  - Full access (full)
  - Manage user data via APIs (api)
  - Perform requests at any time (refresh_token, offline_access)
  - Manage user data via Web browsers (web)
- Require Proof Key for Code Exchange (PKCE) Extension for Supported Authorization Flows: unchecked
- Require Secret for Web Server Flow: checked
- Require Secret for Refresh Token Flow: unchecked
- Save
