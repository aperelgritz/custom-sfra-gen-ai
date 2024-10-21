# Custom SFRA Gen AI E-commerce Prototypes

This repository contains three e-commerce prototypes that demonstrate Generative AI capabilities using Salesforce Einstein AI’s Prompt Builder within the Salesforce Commerce Cloud (SFRA) framework.

## Implemented Prototypes & Demos

**Natural Language Search** - Automatically switches to a Generative AI-powered search after typing 3 or more words ([Search Demo](https://org62.my.salesforce.com/sfc/p/000000000062/a/ed000000ApxJ/SDnJj1dvw4nWGPW0KVlEKRtHvgTFYzXk8uGIC0MaDcY)):

- `Natural_Language_Search`: Uses catalog CSV for search.
- `Vector_Search`: Searches against the Data Cloud Vector DB.

**Gift Finder** - Provides recommendations in 3 price ranges or groups ([Gift Finder Demo](https://org62.my.salesforce.com/sfc/p/000000000062/a/ed000000Apyv/TmyshzUuH_eT3kYJW0Oc91m2lu2_01sIvbR5eUHkD74)):

- `Gift_Finder`: sorts recommended products into 3 groups by price range.
- `Gift_Finder_Self_Grouping`: sorts recommended products into 3 groups determined by the LLM.

**Basket Check** - Compares a customer’s last 2 orders with their current basket to identify missing products ([Basket Check Demo](https://org62.my.salesforce.com/sfc/p/000000000062/a/ed000000Aq29/JkAuW8ux.iBBw9dxVWvsyp44tvfhic.XJtUNAKQBcb8)).

## Data and Template Structure

Each prompt template references a catalog CSV file with the following attributes:
`ID`, `Product Name`, `Short Description`, `Price`, `Color Values`, `Size Values`

The Prompt Templates output JSON that is processed by a Commerce Cloud controller.

## Requirements

### Salesforce Core

- SFRA version 7.0.1
- Services:
  - `salesforce.oauth.cred`: URL to the Salesforce Connect REST API for authentication.
  - `salesforce.connect.rest`: URL to the Salesforce Connect REST API for querying prompt templates.
- Custom Object:
  - `SFGenAIAuth`: to store the access token and expiration.

### Commerce Cloud

- Licenses enabling Einstein AI capabilities
- Prompt Templates
- Connected App to enable Commerce Cloud to query the Connect REST API

## Configuration & Deployment

### Salesforce Core

Connected App:
Setup > App Manager > Create Connected App:

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
