control 'array-in-header' do
  tag array: [1, 2, 3, 4, 5]
  tag array: [1, 2,
  3, 4, 5]
  tag array: [1,
  2,

        3,
  4, 5]
  
  describe_block = nil
end
