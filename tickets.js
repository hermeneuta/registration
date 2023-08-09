//EJC Acro & Aerial Workshops.
//Program creates list of participiants for a given workshop

import fs from "fs";
import Papa from "papaparse";

const participantsFilePath = "ws.csv"; // Update with the correct path
const waitingListFilePath = "wait.csv"; // Update with the correct path

function processCsv(csvData, nameColumn) {
  const ticketToNames = {};
  const all = [];

  Papa.parse(csvData, {
    header: true,
    step: (result) => {
      const ticket = result.data["Ticket"];
      const name = result.data[nameColumn];

      if (!ticketToNames[ticket]) {
        ticketToNames[ticket] = [];
      }

      if (name != "") {
        ticketToNames[ticket].push(name);
        all.push(name);
      }
    },
  });

  //Uncomment to test if somebody doesn't enroll for more than 3 workshops
  // const all_uniq = new Set(all);
  // const watch = [];
  // for (const name_uniq of all_uniq) {
  //   let i = 0;
  //   for (const name of all) {
  //     if (name_uniq === name) {
  //       i++;
  //     }
  //     if (i > 3) {
  //       watch.push(name_uniq);
  //       break;
  //     }
  //   }
  // }
  // console.log("Check: ", watch.join(", "));
  //
  return ticketToNames;
}

const participants = processCsv(
  fs.readFileSync(participantsFilePath, "utf8"),
  "Ticket Full Name"
);
const waitingList = processCsv(
  fs.readFileSync(waitingListFilePath, "utf8"),
  "Name"
);

const allTickets = new Set([
  ...Object.keys(participants),
  ...Object.keys(waitingList),
]);
let output = "";

for (const ticket of allTickets) {
  if (ticket != "undefined") {
    const participantNames = participants[ticket] || [];
    const waitingListNames = waitingList[ticket] || [];

    const maxLength = Math.max(
      participantNames.length,
      waitingListNames.length
    );

    output += `\n\n# ${ticket}\n`;
    output += "| Participants | Waiting List |\n";
    output += "|--------------|--------------|\n";
    for (let i = 0; i < maxLength; i++) {
      const participantName = participantNames[i] || "";
      const waitingListName = waitingListNames[i] || "";
      output += `| ${i + 1 + ". " + participantName} | ${
        i + 1 + ". " + waitingListName
      } |\n`;
    }
    output += "\n";
  }
}

fs.writeFile("tickets.md", output, (err) => {
  if (err) throw err;
  console.log("tickets.md has been saved!");
});
