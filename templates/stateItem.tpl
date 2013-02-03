@!(item)
<td>
  <input name="key" type="text" value="@item.key" placeholder="name">
</td>
<td>
  <select name="type">
    <option @if(item.type === 'String'){ selected }>String</option>
    <option @if(item.type === 'Number'){ selected }>Number</option>
    <option @if(item.type === 'Boolean'){ selected }>Boolean</option>
  </select>
</td>
<td>
  <input name="value" type="text" value="@item.value" placeholder="value">
  <span class="validation"></span>
</td>