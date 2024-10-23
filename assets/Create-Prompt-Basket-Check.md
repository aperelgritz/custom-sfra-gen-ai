### Create a new Prompt Template:

- Connect to your Salesforce Org
- Setup > Prompt Builder
- Click "New Prompt Template"
  - Prompt Template Type: Flex
  - Name: Basket Check
  - API Name: Basket_Check
  - Sources:
    - Name: Basket Products
    - API Name: Basket_Products
    - Source Type: Free Text
  - Sources:
    - Name: Order History
    - API Name: Order_History
    - Source Type: Free Text

### Configure the Prompt Template:

- Open "Configuration" Panel
- Go to "Template Properties" tab:
  - Model Type: Standard
  - Models: GPT 4 Omni
- In the Prompt Template Workspace, enter the following prompt:

```
You're an agent helping a customer buying products on an online store.
You need to scan the customer's current basket provided below, and each one of their past orders provided below.
You then need to identify and list which products and quantities are present in the past orders, but may be missing in the current basket.

Structure the prompt response in JSON, with the missingProducts key containing a list of products ordered in the past, but missing in the current basket.
Make sure you don't forget any missing products, or show products that are in fact not missing.
Output an empty list if you don't find missing products.
Do not output anything else but the JSON object in the response.

Schema of the JSON response:
{
  "missingProducts":
    [
      {
        "productName": "",
        "productId": "",
        "orderDate": "",
        "quantity":
      },
      {
        "productName": "",
        "productId": "",
        "orderDate": "",
        "quantity":
      }
    ]
}

The past orders are structured in JSON, as a list of objects containing product name, quantity, product ID.
The Past Orders JSON is as follows:
{!$Input:Order_History}

The current basket is structured in JSON, as an object containing product name, quantity, product ID.
The Current Basket JSON is as follows:
{!$Input:Basket_Products}
```

- Save and Activate
