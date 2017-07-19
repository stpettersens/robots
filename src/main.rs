mod robots;
extern crate iron;
extern crate params;
use robots::RobotsFile;
use iron::prelude::*;
use iron::status;
use params::Params;

fn process_robots(robots: &RobotsFile) -> String {
    println!("{:#?}", robots);
    println!("{}", robots.get_lines());
    format!("")
}

fn handle_robots(req: &mut Request) -> IronResult<Response> {
    println!("{:?}", req.get_ref::<Params>());
    let map = req.get_ref::<Params>().unwrap();
    let robots = RobotsFile::new(
    &format!("{:?}", map["id"]), 
    &format!("{:?}", map["url"]),
    &format!("{:?}", map["lines"]));
    //process_robots(&robots);*/
    Ok(Response::with((status::Ok, format!("{:?}", robots))))
}

fn main() {
    println!("robots parsing service listening on :1010");
    Iron::new(Chain::new(handle_robots)).http("127.0.0.1:1010").unwrap();
}
