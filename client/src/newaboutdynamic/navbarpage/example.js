import React from "react";
import { Dropdown } from "semantic-ui-react";

const friendOptions = [
  {
    key: "KMC MANIPAL",
    text: "KMC MANIPAL",
    value: "KMC MANIPAL",
    image: {
      avatar: true,
      src:
        "data:image/jpeg;base64,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"
    }
  },
  {
    key: "KMC MANGLORE",
    text: "KMC MANGLORE",
    value: "KMC MANGLORE",
    image: {
      avatar: true,
      src:
        "https://www.edufever.com/wp-content/uploads/2020/05/KMC-Mangalore.jpg"
    }
  },
  {
    key: "MCOPS MANIPAL",
    text: "MCOPS MANIPAL",
    value: "MCOPS MANIPAL",
    image: {
      avatar: true,
      src:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQt9EjEzb7P95nhJ-OjfSsQ0ExrtH7JpV4Fpw&usqp=CAU"
    }
  },
  {
    key: "MCOPS MANGLORE",
    text: "MCOPS MANGLORE",
    value: "MCOPS MANGLORE",
    image: {
      avatar: true,
      src:
        "https://images.collegedunia.com/public/college_data/images/appImage/9680_Untitled.jpg?w=360&h=140&mode=stretch"
    }
  }
];

const DropdownExampleSelection = () => (
  <Dropdown
    placeholder="Select Hospital"
    fluid
    selection
    options={friendOptions}
  />
);

export default DropdownExampleSelection;