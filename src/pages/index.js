import React, { Component } from "react";
import axios from "axios";
import ListTamu from "../components/listTamu";

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isBool: false,
      listData: [],
      dataObject: {
        id: 0,
        name: "",
        email: "",
      },
    };
  }

  getDataApi = () => {
    axios.get("http://localhost:3004/tamu").then((res) => {
      this.setState({
        listData: res.data,
      });
    });
  };

  componentDidMount() {
    this.getDataApi();
  }

  clickCreate = (event) => {
    event.preventDefault();

    if (!this.state.isBool) {
      axios
        .post("http://localhost:3004/tamu", this.state.dataObject)
        .then((res) => {
          this.getDataApi();
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .put(
          `http://localhost:3004/tamu/${this.state.dataObject.id}`,
          this.state.dataObject
        )
        .then((res) => {
          this.getDataApi();
          this.setState({
            isBool: false,
            dataObject: {
              id: 0,
              name: "",
              email: "",
            },
          });
        })
        .catch((err) => console.log(err));
    }
  };

  onChangeInput = (event) => {
    let inputTarget = { ...this.state.dataObject };

    inputTarget[event.target.name] = event.target.value;
    if (!this.state.isBool) {
      inputTarget["id"] = Date.now();
    }

    this.setState({
      dataObject: inputTarget,
    });

    console.log(inputTarget);
  };

  onUpdate = (event) => {
    this.setState({
      dataObject: event,
      isBool: true,
    });
  };

  onDelete = (event) => {
    axios
      .delete(`http://localhost:3004/tamu/${event}`)
      .then((e) => this.getDataApi())
      .catch((e) => console.log(e));
  };

  render() {
    return (
      <div className="w-screen">
        <div className="w-5/12 bg-white rounded-lg shadow-lg shadow-slate-600 p-5 mx-auto my-[100px]">
          <p className="text-lg font-bold text-black flex justify-center">
            Input Data Tamu
          </p>

          <form className="mt-5">
            <div className="flex flex-col m-3">
              <label className="font[20px]">Nama</label>
              <input
                className="border-2 border-black p-2 rounded-lg w-full"
                name="name"
                value={this.state.dataObject.name}
                onChange={this.onChangeInput}
              />
            </div>
            <div className="flex flex-col m-3">
              <label className="font-[20px]">Email</label>
              <input
                className="border-2 border-black p-2 rounded-lg w-full"
                name="email"
                value={this.state.dataObject.email}
                onChange={this.onChangeInput}
              />
            </div>

            <div className="m-3">
              <button
                className="bg-slate-400 p-2 rounded-md text-white font-semibold w-full"
                onClick={this.clickCreate}
              >
                {this.state.isBool ? "Update" : "Tambah"}
              </button>
            </div>
          </form>
        </div>

        <div className="w-5/12 bg-white rounded-lg shadow-lg shadow-slate-600 p-5 mx-auto my-[30px]">
          <p className="m-3 text-[18px] font-semibold">Daftar Tamu</p>
          {this.state.listData.map((data) => (
            <ListTamu
              data={data}
              delete={this.onDelete}
              update={this.onUpdate}
            />
          ))}
        </div>
      </div>
    );
  }
}
