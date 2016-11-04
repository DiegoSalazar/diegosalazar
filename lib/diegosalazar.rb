APP_ROOT = File.expand_path(File.join(File.dirname(__FILE__), '..'))

require 'rubygems'
require 'sinatra'
require 'haml'

class Diegosalazar < Sinatra::Application
  set :root, APP_ROOT
  set :public_folder, File.join(APP_ROOT, "public")
  
  get '/' do
    haml :index, layout: false
  end

  get '/resume' do
    haml :resume, layout: false
  end
end
