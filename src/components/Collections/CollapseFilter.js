import { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useNavigate, useParams } from "react-router-dom";

function CollapseFilter(props) {
  const { setFilterPrice, removeFilter } = props;
  const navigate = useNavigate();
  const param = useParams();
  const [checkP1, setCheckP1] = useState(false);
  const [checkP2, setCheckP2] = useState(false);
  const [checkP3, setCheckP3] = useState(false);
  const [checkP4, setCheckP4] = useState(false);
  const [checkP5, setCheckP5] = useState(false);
  const [selected, setSelected] = useState(1);

  useEffect(() => {
    handleRemoveFilter();
  }, [removeFilter]);

  useEffect(() => {
    setSelected(param.type);
  }, [param.type]);

  const handleRemoveFilter = () => {
    setFilterPrice([]);
    document.getElementById("p1").checked = true;
    document.getElementById("p2").checked = true;
    document.getElementById("p3").checked = true;
    document.getElementById("p4").checked = true;
    document.getElementById("p5").checked = true;
    setCheckP1(false);
    setCheckP2(false);
    setCheckP3(false);
    setCheckP4(false);
    setCheckP5(false);
  };

  const handleChecked = (type) => {
    handleRemoveFilter();
    switch (type) {
      case "p1":
        if (checkP1 === false) {
          setFilterPrice((prev) => ["Dưới 1.000.000đ"]);
          setCheckP1(true);
          document.getElementById("p1").checked = checkP1;
        } else {
          setFilterPrice([]);
          setCheckP1(false);
          document.getElementById("p1").checked = checkP1;
        }
        break;
      case "p2":
        setCheckP2(!checkP2);
        if (!checkP2 === true) {
          setFilterPrice((prev) => ["1.000.000đ - 2.000.000đ"]);
          document.getElementById("p2").checked = checkP2;
        } else {
          setFilterPrice([]);
          document.getElementById("p2").checked = checkP2;
        }
        break;
      case "p3":
        setCheckP3(!checkP3);
        if (!checkP3 === true) {
          setFilterPrice((prev) => ["2.000.000đ - 3.000.000đ"]);
          document.getElementById("p3").checked = checkP3;
        } else {
          setFilterPrice([]);
          document.getElementById("p3").checked = checkP3;
        }
        break;
      case "p4":
        setCheckP4(!checkP4);
        if (!checkP4 === true) {
          setFilterPrice((prev) => ["3.000.000đ - 4.000.000đ"]);
          document.getElementById("p4").checked = checkP4;
        } else {
          setFilterPrice([]);
          document.getElementById("p4").checked = checkP4;
        }

        break;
      case "p5":
        setCheckP5(!checkP5);
        if (!checkP5 === true) {
          setFilterPrice((prev) => ["Trên 4.000.000đ"]);
          document.getElementById("p5").checked = checkP5;
        } else {
          setFilterPrice([]);
          document.getElementById("p5").checked = checkP5;
        }
        break;
      default:
        break;
    }
  };

  return (
    <Accordion
      defaultActiveKey={["0", "1"]}
      alwaysOpen
      className="item-filter-content"
    >
      <Accordion.Item eventKey="0" className="item-content">
        <Accordion.Header>Danh mục sản phẩm</Accordion.Header>
        <Accordion.Body>
          <div
            className={`item-collection collection ${
              selected === "all" ? "active" : ""
            }`}
            onClick={() => {
              navigate("/collections/all");
            }}
          >
            <span>Tất cả</span>
          </div>
          <div
            className={`item-collection collection ${
              selected === "Mèo" ? "active" : ""
            }`}
            onClick={() => {
              navigate("/collections/Mèo");
            }}
          >
            <span>Mèo</span>
          </div>
          <div
            className={`item-collection collection ${
              selected === "Thức ăn" ? "active" : ""
            }`}
            onClick={() => {
              navigate("/collections/Thức ăn");
            }}
          >
            <span>Thức ăn</span>
          </div>
          <div
            className={`item-collection collection ${
              selected === "Vệ sinh" ? "active" : ""
            }`}
            onClick={() => {
              navigate("/collections/Vệ sinh");
            }}
          >
            <span>Vệ sinh</span>
          </div>
          <div
            className={`item-collection collection ${
              selected === "Sức khoẻ" ? "active" : ""
            }`}
            onClick={() => {
              navigate("/collections/Sức khoẻ");
            }}
          >
            <span>Sức khoẻ</span>
          </div>
          <div
            className={`item-collection collection ${
              selected === "Phụ kiện" ? "active" : ""
            }`}
            onClick={() => {
              navigate("/collections/Phụ kiện");
            }}
          >
            <span>Phụ kiện</span>
          </div>
          <div
            className={`item-collection collection ${
              selected === "Combo" ? "active" : ""
            }`}
            onClick={() => {
              navigate("/collections/Combo");
            }}
          >
            <span>Combo</span>
          </div>
        </Accordion.Body>
      </Accordion.Item>
      <br />
      <Accordion.Item eventKey="1" className="item-content">
        <Accordion.Header>Lọc giá</Accordion.Header>
        <Accordion.Body>
          <div className="item-collection">
            <input
              type="checkbox"
              id="p1"
              name="cc"
              checked={checkP1}
              onChange={() => {
                let a = 1;
              }}
            ></input>
            <label
              htmlFor="p1"
              className="checkMark"
              onClick={() => handleChecked("p1")}
            ></label>
            <label htmlFor="p1" onClick={() => handleChecked("p1")}>
              <span>Dưới 1.000.000₫</span>
            </label>
          </div>
          <div className="item-collection">
            <input
              type="checkbox"
              id="p2"
              name="cc"
              className="inputCheck"
              checked={checkP2}
              onChange={() => {
                let a = 1;
              }}
            />
            <label
              htmlFor="p2"
              className="checkMark"
              onClick={() => handleChecked("p2")}
            ></label>
            <label htmlFor="p2" onClick={() => handleChecked("p2")}>
              <span>1.000.000₫ - 2.000.000₫</span>
            </label>
          </div>
          <div className="item-collection">
            <input
              type="checkbox"
              id="p3"
              name="cc"
              className="inputCheck"
              checked={checkP3}
              onChange={() => {
                let a = 1;
              }}
            />
            <label
              htmlFor="p3"
              className="checkMark"
              onClick={() => handleChecked("p3")}
            ></label>
            <label htmlFor="p3" onClick={() => handleChecked("p3")}>
              <span> 2.000.000₫ - 3.000.000₫</span>
            </label>
          </div>
          <div className="item-collection">
            <input
              type="checkbox"
              id="p4"
              name="cc"
              className="inputCheck"
              checked={checkP4}
              onChange={() => {
                let a = 1;
              }}
            />
            <label
              htmlFor="p4"
              className="checkMark"
              onClick={() => handleChecked("p4")}
            ></label>
            <label htmlFor="p4" onClick={() => handleChecked("p4")}>
              <span>3.000.000₫ - 4.000.000₫</span>
            </label>
          </div>
          <div className="item-collection">
            <input
              type="checkbox"
              id="p5"
              name="cc"
              className="inputCheck"
              checked={checkP5}
              onChange={() => {
                let a = 1;
              }}
            />
            <label
              htmlFor="p5"
              className="checkMark"
              onClick={() => handleChecked("p5")}
            ></label>
            <label htmlFor="p5" onClick={() => handleChecked("p5")}>
              <span>Trên 4.000.000₫</span>
            </label>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default CollapseFilter;
