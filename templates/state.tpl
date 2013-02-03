@!(state)

@function renderItem(i) {
<tr data-id="@i.key">
  <td>
    <input type="text" value="@i.key" placeholder="name">
  </td>
  <td>
    <select>
      <option>String</option>
      <option>Number</option>
      <option>Boolean</option>
    </select>
  </td>
  <td>
    <input type="text" value="@i.value" placeholder="value">
  </td>
</tr>
}

<section id="state">
  <h2>state (@state.length)</h2>
  <a href="" id="new-state">+ new</a>

  <table class="width-100 simple hovered stroked">
    <thead>
    <tr>
      <th>name</th><th>type</th><th>value</th>
    </tr>
  </thead>
  <tbody>
    @state.map(renderItem)
  </tbody>
  </table>


</section>
