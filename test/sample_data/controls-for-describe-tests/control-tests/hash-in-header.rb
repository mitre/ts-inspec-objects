control 'hash-in-header' do
  tag hash: { 'one' => '1', 'two' => '2', 'three' => '3' }
  tag hash: { 'one' => '1',
    'two' => '2',
    'three' => '3' }
  tag hash: { 'one' => '1',
'two' => '2',

  'three' => '3',
}

  describe_block = nil
end
