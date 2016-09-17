file_to_process = ARGV.first # handling single file for time being
throw 'Cannot work without file' unless file_to_process
# should use rdiscount instead of kramdown
def transform_markdown text
  require 'kramdown'
  readme_content = Kramdown::Document.new(text).to_html
  rendered_content = <<EOF
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="vendor/github-markdown-css/github-markdown.css">
  <title>Offline readme preview </title>
</head>
<body>
<div class="markdown-body">
#{readme_content}</div>
</body>
</html>
EOF
end

data = File.read(File.join(Dir.pwd, file_to_process))
puts transform_markdown data
