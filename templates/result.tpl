@!(model)
@{
  var result = '??';
  if (typeof model.result === 'boolean') result = model.result;
  if (model.error) result = model.error.message;

  var resultClass = 'error';
  if (result === true) resultClass = 'true';
  if (result === false) resultClass = 'false';
}

<span class="@resultClass">@result</div>