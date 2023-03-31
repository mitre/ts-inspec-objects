  describe registry_key('HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System') do
    it { should have_property 'LegalNoticeText' }
  end

  key = registry_key('HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System').LegalNoticeText.to_s

  k = key.gsub("\u0000", '')
  legal_notice_text = input('LegalNoticeText')

  describe 'The required legal notice text' do
    subject { k.scan(/[\w().;,!]/).join }
    it { should cmp legal_notice_text.scan(/[\w().;,!]/).join }
  end