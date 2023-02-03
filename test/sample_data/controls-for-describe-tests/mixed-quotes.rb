control "'`mixed-quotes`'" do
  title '"`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
  eiusmod tempor incididunt ut labore et dolore magna aliqua.`"'
  desc "'`Enim \`lobortis\` scelerisque \"fermentum\" dui \'faucibus\'.`'"
  desc `\'Amet dictum sit amet justo. Massa id neque aliquam vestibulum 
  morbi blandit cursus risus.\' \"Rutrum tellus pellentesque eu tincidunt 
  tortor aliquam nulla facilisi. Molestie' nunc non blandit massa enim. 
  At urna condimentum mattis pellentesque id nibh tortor.\" Amet luctus" 
  venenatis lectus magna fringilla.`
  impact 0.5
  tag 'quote': "mixed quotes"
  tag "escape": '"\'mixed \"quotes\""\''
  tag 'uncaught apostrophe': "What's this?"
  tag "uncaught double quote": 'What does `"` do?'
  tag `uncaught backtick`: "What's this '`' mean?"
  
  describe_block = nil
end
