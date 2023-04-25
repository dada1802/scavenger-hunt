const pw = document.getElementById('i1')
pw.addEventListener('keyup', (ev) => {
  if (ev.key === 'Enter') {
    const autoOutput = document.getElementById('auto');
    const autoContent = autoOutput.value;
    const structuredContent = JSON.parse(autoContent);
    const firstReqPromise = fetch(`${structuredContent.next}${pw.value}.json`);
    const handleData = (data) => data.subtotals.reduce((a, b) => a + b);
    firstReqPromise
      .then((resp) => {
        const parsed = resp.json();
        return parsed;
      })

      .then((data) => {
        document.getElementById("i1-out").innerText = JSON.stringify(data);
        return data.steps[0].req;
      })

      .then((url) => {
        return fetch(url).then((r) => r.json());
      })

      .then((resp2) => {
        document.getElementById("i2-out").innerText = JSON.stringify(resp2);
        return Object.keys(resp2).length;
      })

      .then((key) => {
        return fetch(`https://w3.cs.jmu.edu/stewarmc/scavenge/${key}.json`).then((r) => r.json());
      })

      .then((data2) => {
        document.getElementById("i3-out").innerText = JSON.stringify(data2);
        return data2;
      })

      .then(handleData)

      .catch((err) => {
        console.error("Caught an error!", err);
      })
    
    // ----- Example 2 -----
    // const response1 = firstReqPromise.then((resp) => {
    //   return resp;
    // });
    // const parsed1 = response1.then((resp) => {
    //   return resp.json();
    // });

    // ----- Example 1 -----
    // let req = new XMLHttpRequest();
    // req.addEventListener("load", function (ev) {
    //   const structuredData = JSON.parse(ev.target.responseText);
    //   const data = structuredData;
    //   let req2 = new XMLHttpRequest();
    //   req2.addEventListener("load", function (ev) {
    //     const structuredData = JSON.parse(ev.target.responseText);
    //     const keyCount = Object.keys(structuredData).length;
    //     document.getElementById("i2-out").innerText = ev.target.responseText;
    //     let req3 = new XMLHttpRequest();
    //     req3.addEventListener("load", function (ev) {
    //       const structuredData = JSON.parse(ev.target.responseText);
    //       document.getElementById("i3-out").innerText = ev.target.responseText;
    //       const sum = structuredData.subtotals.reduce((a, b) => a + b);
    //       document.getElementById("i4-out").innerText = sum;
    //     });
    //     req3.open("GET", `https://w3.cs.jmu.edu/stewarmc/scavenge/${keyCount}.json`);
    //     req3.send();
    //   });
    //   req2.open("GET", `${data.steps[0].req}`); 
    //   req2.send();
    //   document.getElementById("i1-out").innerText = ev.target.responseText;
    // });
    // req.open("GET", `${structuredContent.next}${pw.value}.json`);
    // req.send();
  }
})