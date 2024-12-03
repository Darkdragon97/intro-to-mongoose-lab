require('dotenv').config()

const mongoose = require("mongoose")

const prompt = require('prompt-sync')()

const Customer = require("./modules/customer")

const connect = async () =>
{
    await mongoose.connect(process.env.MONGODB_URI)
}

const username = prompt('Your name?')

console.log(`Your username: ${username}`)

const askChoice = ()=>
{
    console.log("\n What do you want to do? \n",
        "1. Create a customer?\n",

        "2. View All Customers?\n",

        "3. Update Customer Infomaiton?\n",

        "4. Delete a customer?\n",

        "5. Quit?\n"
    )

    const selection = prompt("Put the corresponding number of the action you want to do: ");
    return parseInt(selection)
}

const createCustomer= async ()=>
{
    const name = prompt("Customer Name: ")
    const age = prompt("Customer Age: ")
    const customer = await Customer.create({ name, age})
    console.log("Customer added with details:", customer)
}

const viewCustomers = async () =>
{
    const customers = await Customer.find();
    console.log("Customer List: ", customers);
}

const updateCustomer = async () =>
{
    const customerId = prompt("Enter Customer ID to update: ");

    const name = prompt("Enter the New Name for the Customer: ")

    const age = prompt("Enter the new age for the Customer: ")

    const updatedCustomer = await Customer.findByIdAndUpdate(customerId, {name, age})

    console.log("Customer Updated!")

}

const deleteCustomer = async () =>
{
    const customerId = prompt("Enter Customer ID to delete: ")

    const deletedCustomer = await Customer.findOneAndDelete(customerId)
    console.log("Customer Deleted!", deletedCustomer)
}

const choices = async () =>
{
let choice = askChoice()
console.log(choice)

switch(choice)
{
case 1:
await createCustomer()

break;
case 2:
await viewCustomers()

break;
case 3:
await updateCustomer()

break
case 4:
await deleteCustomer()

break
case 5:
console.log("GoodBye")

mongoose.connection.close()

break
default:
console.log("Incorrect Choice.")
}
}

choices();

connect();