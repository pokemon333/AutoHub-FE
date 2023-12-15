 const helpers = {
    sortByName : () => {
        return (a: { name: string; }, b: { name: string; }) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          }
    }


}

export default helpers;