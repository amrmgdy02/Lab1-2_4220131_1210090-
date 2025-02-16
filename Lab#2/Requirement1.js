var items = [], transactions = [], categories = [], fields = {};

const commands = {
    ADD : "add",
    EDIT : "edit",
    SALE : "sale",
    REMOVE : "removeItem",
    RESTOCK : "restock",
    DELETE : "delete"
}

const actions = {
    SEARCH : "search",
    VIEW_INVENTORY : "viewInventory",
    EXPORTA_LL : "exportAll",
    VIEW_ALL_TRANSACTIONS : "viewAllTransactions",
    VIEW_ITEMS_AGE : "viewItemsAge",
    IMPORT : "import",
    ADD_FIELD : "addField",
    UPDATE_CUSTOMER_FIELD : "updateCustomField",
}

// Check if exceeded the minimum quantity
function checkQuantity(quantity) {
    if (quantity < 10) {
        console.log("Alert: Quantity is less than 10!")
    }
}

// Function to add new item to inventory
function addItem(data)
{
    let item = {
        name: data[0],
        category: data[1],
        quantity: data[2],
        price: data[3],
        unit: data[4],
        addedAt: new Date(),
        customField: data[5] || {}
    };
    items.push(item);

    // Add the category if it is a new category
    if (!categories.includes(data[1])) {
        categories.push(data[1]);
    }

    // Save the transaction
    let transaction = { 
        type: commands.ADD,
        item 
        }
    transactions.push(transaction); 
}

// Function to edit an existing item in the inventory
function editItem(data)
{
    transactions.push({ type: commands.EDIT, old: { ...items[data[0]] }, new: data.slice(1) });
            items[data[0]] = { 
                ...items[data[0]], 
                name: data[1], 
                category: data[2], 
                quantity: data[3], 
                price: data[4], 
                unit: data[5], 
                customField: data[6] || {} 
            };
}

// Function to delete item from the inventory
function deleteItem(data)
{
    transactions.push({ type: commands.DELETE, item: items[data[0]] });
    items.splice(data[0], 1);
}

// Function to update an item salling operation
function saleItem(item, quantity)
{
    item.quantity -= quantity;
    checkQuantity(item.quantity);
    transactions.push({ type: SALE, item: item, quantitySold: quantity, date: new Date() });
    console.log(`Sold ${quantity} ${item.unit} of ${item.name}`);
}

// Function to restock item in the inventory
function restockItem(item, quantity)
{
    item.quantity += quantity;
    transactions.push({ type: commands.RESTOCK, item: item, quantityRestocked: quantity, date: new Date() });
    console.log(`Restocked ${quantity} ${item.unit} of ${item.name}`);
}

// Inventory processor function
function inventoryManager(action, data)
{
    let name = data[0];

    if ([commands.ADD, commands.EDIT, commands.REMOVE].includes(action)) {  
        if (action === commands.ADD) {
            addItem(data);
        } 
        else if (action === commands.EDIT && items[name]) {
            editItem(data);
        } 

        else if (action === commands.REMOVE && items[name]) {
            deleteItem(data);
        }
        console.log("=== Dashboard ===\nItems: " + items.length + "\nTotal: $" + items.reduce((total, x) => total + x.quantity * x.price, 0).toFixed(2) + "\Categories: " + categories.join(', '));
    }

    if ([commands.SALE, commands.RESTOCK].includes(action)) {

        let quantity = data[1];

        for (let item of items) {

            if (item.name === name) {
                if (action === commands.SALE && item.quantity >= quantity) {
                    saleItem(item, quantity)
                }

                else if (action === commands.RESTOCK) {
                    restockItem(item, quantity)
                }
                break;
            }
        }
    }

    switch (action) {
        case actions.SEARCH:
            console.log(items.filter(item => 
                [item.name, item.category, item.price].some(v => 
                    v.toString().toLowerCase().includes(data[0].toLowerCase())
                )
            ));
            break;
    
        case actions.VIEW_INVENTORY:
            console.log("=== Inventory ===", items);
            break;
    
        case actions.EXPORTA_LL:
            console.log("CSV:\n" + 
                ["Name,Category,Quantity,Price,Unit,AddedAt"]
                .concat(items.map(x => Object.values(x).join(',')))
                .join('\n')
            );
            break;
    
        case actions.VIEW_ALL_TRANSACTIONS:
            console.log("Transactions:\n", t);
            break;
    
        case actions.VIEW_ITEMS_AGE:
            console.log(items.map(x => 
                `${x.name}: ${Math.floor((new Date() - new Date(x.added)) / (1000 * 60 * 60 * 24))}d`
            ).join('\n'));
            break;
    
        case actions.IMPORT:
            data[0].forEach(item => 
                inventoryManager("add", [item.name, item.category, item.quantity, item.price, item.unit])
            );
            break;
    
        case actions.ADD_FIELD:
            if (!fields[data[0]])
                {
                    fields[data[0]] = null;
                }
            break;
    
        case actions.UPDATE_CUSTOMER_FIELD:
            items.find(x => x.name === data[0])?.customField[data[1]] = data[2];
            break;
    }
}
