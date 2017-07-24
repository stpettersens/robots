/*
Robots parser service written with Rust and JavaScript (Node.js + Express.js + Handlebars.js).
Copyright (c) 2017 Sam Saint-Pettersen.

Released under the MIT License.
*/
mod robots;
extern crate iron;
extern crate params;
extern crate regex;
extern crate sqlite;
use robots::RobotsFile;
use iron::prelude::*;
use iron::status;
use params::Params;
use regex::Regex;
use std::path::Path;

fn create_database(db: &str) {
    if !Path::new(db).exists() {
        let conn = sqlite::open(db).unwrap();
        conn.execute("
        CREATE TABLE robots (id TEXT, url TEXT, lines TEXT);"
        ).unwrap();
    }
}

fn process_robots(db: &str, robots: &RobotsFile) -> String {
    let conn = sqlite::open(db).unwrap();
    conn.iterate(&format!("SELECT id FROM robots WHERE id = {}", robots.get_id()), |pairs| {
        for &(column, value) in pairs.iter() {
            println!("{} = {}", column, value.unwrap());
        }
        true
    }).unwrap();
    String::new()
}

fn handle_robots(req: &mut Request) -> IronResult<Response> {
    println!("{:?}", req.get_ref::<Params>());
    let map = req.get_ref::<Params>().unwrap();
    let robots = RobotsFile::new(
    &format!("{:?}", map["id"]), 
    &format!("{:?}", map["url"]),
    &format!("{:?}", map["lines"]));
    process_robots("db/robots.db", &robots);
    Ok(Response::with((status::Ok, format!("{:?}", robots))))
}

fn main() {
    create_database("db/robots.db");
    println!("robots parsing service listening on :1010");
    Iron::new(Chain::new(handle_robots)).http("127.0.0.1:1010").unwrap();
}
