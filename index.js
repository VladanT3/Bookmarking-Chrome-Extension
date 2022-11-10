function render(leads)
{
    listItems = ""
    for (let i = 0; i < leads.length; i++)
    {
        listItems += `
        <li>
            <a href='${leads[i]}' target='_blank'>${leads[i]}</a>
        </li>`
    }
    ulEl.innerHTML = listItems
}


let myLeads = []
let listItems
const inputEl = document.getElementById("input-el")
const saveBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("saveTab-btn")
const ulEl = document.getElementById("ul-el")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const testP = document.getElementById("test")

if (leadsFromLocalStorage)
{
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

saveBtn.addEventListener("click", function()
{
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})
deleteBtn.addEventListener("dblclick", function()
{
    localStorage.clear()
    myLeads = []
    render(myLeads)
})
tabBtn.addEventListener("click", function()
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
    {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})