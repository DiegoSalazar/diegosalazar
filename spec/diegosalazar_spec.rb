require 'spec_helper'

describe 'Diegosalazar' do

  it 'should load the index' do
    get '/'
    last_response.should.be.ok
  end
end
