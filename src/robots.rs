#[derive(Debug)]
pub struct RobotsFile {
    id: String,
    url: String,
    lines: String,
}

impl RobotsFile {
    pub fn new(id: &str, url: &str, lines: &str) -> RobotsFile {
        RobotsFile {
            id: id[1..&id.len() - 1].to_owned(),
            url: url[1.. &url.len() - 1].to_owned(),
            lines: lines.to_owned(),
        }
    }
    pub fn get_id(&self) -> &str {
        &self.id
    }
    pub fn get_url(&self) -> &str {
        &self.url
    }
    pub fn get_lines(&self) -> &str {
        &self.lines
    }
}
