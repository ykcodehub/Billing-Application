export function ReceiptHtml(
  store: any,
  bill: any,
  items: any[]
) {

  return `

<html>

<body style="font-family:monospace;padding:20px;">

${store?.logo ? `
<div style="text-align:center;margin-bottom:10px;">
  <img
    src="${store.logo}"
    style="
      width:70px;
      height:70px;
      object-fit:contain;
      border-radius:10px;
    "
  />
</div>
` : ""}

<h2 style="text-align:center;">
${store?.storeName || "STORE"}
</h2>

<p style="text-align:center;">
${store?.address ?? ""}
</p>

<p style="text-align:center;">
${store?.phone ?? ""}
</p>

<hr/>

<p>
Bill : ${bill.billNo}
</p>

<p>
${bill.createdAt}
</p>

<hr/>

${items.map(item=>`

<div
style="
display:flex;
justify-content:space-between;
margin-bottom:6px;
">

<span>

${item.name}

</span>

<span>

${item.qty} x ${item.price}

</span>

</div>

`).join("")}

<hr/>

<h3>

Total : ₹ ${bill.total}

</h3>

<p>

Thank You

</p>

</body>

</html>

`;

}