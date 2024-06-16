export const addSchema = () => {
    return [
      {
        label: "Product Id",
        type: "text",
        placeholder: '123..',
        name: 'productId'
      },
      {
        label: "Product Name",
        type: "text",
        placeholder: 'Enter product name...',
        name: 'productName'
      },
      {
        label: "Units",
        type: "number",
        placeholder: '0',
        name: 'units'
      },
      {
        label: "Sale Price",
        type: "number",
        placeholder: '0.00',
        name: 'salePrice'
      },
      {
        label: "Purchase Price",
        type: "number",
        placeholder: '0.00',
        name: 'purchasePrice'
      },
      {
        label: "Minimum Quantity",
        type: "number",
        placeholder: '0',
        name: 'minimumQuantity'
      },
      {
        label: "Category",
        type: "text",
        placeholder: 'Metal,Safety',
        name: 'category'
      },

    ];
  };
  