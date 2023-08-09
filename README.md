## EJC Workshop Registration

### Aim
Acro and aerial workshops are very popular during EJC. Unfortunately, there are usually **not enough equipment** to accommodate everyone, and therefore some form of registration is needed. Knowing from experience that offline registration can create huge queues and be time-consuming, we have decided to go online and use the [Tito](tito.io) platform for the 2023 EJC edition. This manual describes **the best practices for creating fast, accurate, and easy-to-print lists of attendees, as well as those on waiting lists, for every workshop on a given day.** The described solution equips you with scripts that prevent the tedious process of copying and pasting data.

### Registration overview
Registration was open from 1:30pm to 4pm one day before the workshops. At 10am on the day of the workshops, we delivered the printed lists of attendees and people on the waiting list to the acro desk, from where instructors could pick up the proper papers. In cases where there were empty slots, instructors had the option to accept people from the waiting list.

### How To

#### Solution
For our aim, we decided to use the [Tito](tito.io) platform. It's free of charge when you create free events, and it comes with many practical functionalities, such as allowing the scheduling of tickets, sending emails when registration occurs, or exporting attendee and waiting list data. 
Additionally, we created scripts to enhance the process of exporting data from Tito.

#### Requirements
To perform the actions described below, it is beneficial to have basic knowledge of JavaScript programming (especially in the Node.js environment) and an understanding of how to use the terminal.

##### Structure of a Ticket Name
When designing the ticket name, we follow this structure:
**workshop title | instructor | day and hour | place**

![attendees](https://github.com/hermeneuta/registration/assets/53684759/1f23f1b3-8a47-40a3-be4c-4e59bac8e49f)


This structure was informative both for the participants and for the person managing the registration.

##### Exporting
After registration is finished, we need to export two files in CSV format. 

The first file contains information about attendees for a given day. To do so:
1. Go to **Attendees** in the left menu.
(img)
2. In the **Filter** menu tick the tickets that you want to export, and apply your choices.
3. Export the list of attendees to CSV.
4. Rename the exported file to **ws.csv**

The second file will be with people from waiting list. 
1. Go to **Waiting List** in the left menu

![waiting](https://github.com/hermeneuta/registration/assets/53684759/c8cca5d7-7d2b-46ef-9f41-c56ac169072c)

3. Export people from the Waiting List, making sure to include only those from the day you are interested in.
4. Rename the exported file to **wait.csv**

##### Scripts

1. Move to your project folder on your local machine (e.g., `~/EJC`) and clone this repo:
`git clone git@github.com:hermeneuta/registration.git`
The repository contains four files:
- _package.json_: Information about dependencies
- _tickets.js_: Main script 
- _convert\_to\_pdf_: Converts markdown file to PDF file
- _headers.tex_: When converting to PDF, this assures that every workshop is on separate page. The “#” in the .md file is used as a delimiter.
1. Copy your CSV files (ws.csv and wait.csv) to the **registration** folder where all the above files are located.
2. Before you run `tickets.js`, make sure you initialized npm by running `npm init`
3. Now, run the main script executing `node tickets.js`
4. This will produce `tickets.md` file with all required information (workshop name, attendees list, waiting list with order of priority). You can edit .md file to adjust to your needs. 
5. After that, run `node convert_to_pdf.js` to produce a nicely formatted PDF file.  
6. Now, you can simply print your PDF file.

##### Dependencies
In order to work, the scripts mentioned above require some additional dependencies:
- _pandoc_: program that allows for the conversion different formats.
- _LaTeX_: Required to ensure that the `headers.tex` file works properly.
- _papaparse_: This package should be downloaded when you initialized npm, due to its presence in the `package.json` file from the repository.

#### Problems
Although this solution allows you to produce lists quickly each day without tedious manual work, it may be challenging for a person who never worked with Node.js environment or the terminal. If you encounter any problems with setting up, or if you think that this manual isn’t clear, please feel free to contact me at hello@mathesis.dev. I’ll do my best to help you. 

 




