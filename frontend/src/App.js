import { useState, useEffect, createContext, useContext } from "react";
import {
  Layout,
  Typography,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Tag,
  Space,
  message,
  Menu,
  DatePicker,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  AppstoreOutlined,
  SearchOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/id";
import "./styles/responsive.css";

dayjs.locale("id");

const { Sider, Content, Header } = Layout;
const { confirm } = Modal;
const { Title } = Typography;

export const AppContext = createContext();

export default function App() {
  const [page, setPage] = useState("todos");
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const res = await axios.get("http://localhost:5000/api/categories");
    setCategories(res.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <AppContext.Provider value={{ categories, fetchCategories }}>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider theme="dark" breakpoint="lg" collapsedWidth="0" width={220}>
          <div style={{ color: "#fff", padding: 16, fontSize: 20, fontWeight: 600 }}>
            Industrix Todo
          </div>

          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[page]}
            onClick={(e) => setPage(e.key)}
            items={[
              { key: "todos", label: "Todos", icon: <AppstoreOutlined /> },
              { key: "categories", label: "Categories", icon: <AppstoreOutlined /> },
            ]}
          />
        </Sider>

        <Layout>
          <Header style={{ background: "#fff", paddingLeft: 24 }}>
            <Title level={4} style={{ margin: 0 }}>
              {page === "todos" ? "Todo Management" : "Category Management"}
            </Title>
          </Header>

          {page === "todos" ? <TodoPage /> : <CategoryPage />}
        </Layout>
      </Layout>
    </AppContext.Provider>
  );
}

// ======================= TODO PAGE ======================= //
function TodoPage() {
  const { categories } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);

  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState(null);
  const [filterPriority, setFilterPriority] = useState(null);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchTodos = async (page = 1) => {
    const res = await axios.get(
      `http://localhost:5000/api/todos?page=${page}&limit=10&search=${search}&category=${filterCategory || ""}&priority=${filterPriority || ""}`
    );
    setTodos(res.data.data);
    setPagination(res.data.pagination);
  };

  useEffect(() => {
    fetchTodos();
  }, [search, filterCategory, filterPriority]);

  // ⭐ FIX FILTER EVENT
  const handleCategoryChange = (value) => {
    setFilterCategory(value);
    fetchTodos(1);
  };
  const handlePriorityChange = (value) => {
    setFilterPriority(value);
    fetchTodos(1);
  };

  const handleTableChange = (pagination) => {
    fetchTodos(pagination.current);
  };

  const toggleStatus = async (id) => {
    await axios.patch(`http://localhost:5000/api/todos/${id}/toggle`);
    fetchTodos(pagination.current);
  };

  const openEdit = (todo) => {
    setEditingTodo(todo);
    setOpen(true);
    form.setFieldsValue({
      ...todo,
      due_date: todo.due_date ? dayjs(todo.due_date) : null,
    });
  };

  const remove = (id) => {
    confirm({
      title: "Delete this todo?",
      onOk: async () => {
        await axios.delete(`http://localhost:5000/api/todos/${id}`);
        fetchTodos(pagination.current);
      },
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      if (values.due_date) values.due_date = values.due_date.toISOString();

      editingTodo
        ? await axios.put(`http://localhost:5000/api/todos/${editingTodo.id}`, values)
        : await axios.post("http://localhost:5000/api/todos", values);

      message.success("Success!");
      form.resetFields();
      setOpen(false);
      setEditingTodo(null);
      fetchTodos();
    } catch {}
  };

  const isOverdue = (todo) =>
    todo.due_date && !todo.completed && dayjs(todo.due_date).isBefore(dayjs(), "day");

  const columns = [
    { title: "Title", dataIndex: "title" },
    {
      title: "Due Date",
      render: (_, r) =>
        r.due_date ? (
          <span style={{ color: isOverdue(r) ? "red" : "inherit" }}>
            {dayjs(r.due_date).format("DD MMMM YYYY")}
            {isOverdue(r) && " ⚠ Overdue"}
          </span>
        ) : "-",
    },
    {
      title: "Category",
      render: (_, r) => (
        <Tag color={r.category?.color}>{r.category?.name || "-"}</Tag>
      ),
    },
    {
      title: "Priority",
      render: (_, r) => {
        const color =
          r.priority === "high" ? "red" : r.priority === "medium" ? "gold" : "green";
        return <Tag color={color}>{r.priority}</Tag>;
      },
    },
    {
      title: "Status",
      render: (_, r) => (
        <Button type="text" onClick={() => toggleStatus(r.id)}>
          {r.completed ? (
            <span style={{ color: "green" }}>
              <CheckOutlined /> Done
            </span>
          ) : (
            <span style={{ color: "red" }}>
              <CloseOutlined /> Not Done
            </span>
          )}
        </Button>
      ),
    },
    {
      title: "Action",
      render: (_, r) => (
        <Space>
          <Button type="text" icon={<EditOutlined />} onClick={() => openEdit(r)} />
          <Button type="text" danger icon={<DeleteOutlined />} onClick={() => remove(r.id)} />
        </Space>
      ),
    },
  ];

  return (
    <Content style={{ padding: 20 }}>
      <Space style={{ marginBottom: 12 }} wrap>
        <Input placeholder="Search..." prefix={<SearchOutlined />} onChange={(e) => setSearch(e.target.value)} />

        <Select placeholder="Category" allowClear onChange={handleCategoryChange}>
          {categories.map((c) => (
            <Select.Option key={c.id} value={c.id}>{c.name}</Select.Option>
          ))}
        </Select>

        <Select placeholder="Priority" allowClear onChange={handlePriorityChange}>
          <Select.Option value="high">High</Select.Option>
          <Select.Option value="medium">Medium</Select.Option>
          <Select.Option value="low">Low</Select.Option>
        </Select>

        <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>
          Add Todo
        </Button>
      </Space>

      <Table
        columns={columns}
        dataSource={todos}
        rowKey="id"
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: "max-content" }}
      />

      <Modal
        title={editingTodo ? "Edit Todo" : "Add Todo"}
        open={open}
        onOk={save}
        onCancel={() => { setOpen(false); form.resetFields(); setEditingTodo(null); }}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea rows={2} />
          </Form.Item>

          <Form.Item name="priority" label="Priority" initialValue="low">
            <Select>
              <Select.Option value="high">High</Select.Option>
              <Select.Option value="medium">Medium</Select.Option>
              <Select.Option value="low">Low</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="category_id" label="Category">
            <Select>
              {categories.map((c) => (
                <Select.Option key={c.id} value={c.id}>
                  {c.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="due_date" label="Due Date">
            <DatePicker format="DD MMMM YYYY" />
          </Form.Item>
        </Form>
      </Modal>
    </Content>
  );
}

// ====================== CATEGORY PAGE ====================== //
function CategoryPage() {
  const { categories, fetchCategories } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [editing, setEditing] = useState(null);

  const save = async () => {
    const values = await form.validateFields();

    editing
      ? await axios.put(`http://localhost:5000/api/categories/${editing.id}`, values)
      : await axios.post("http://localhost:5000/api/categories", values);

    message.success("Saved!");
    fetchCategories();
    setOpen(false);
    setEditing(null);
    form.resetFields();
  };

  const remove = (id) => {
    confirm({
      title: "Delete?",
      onOk: async () => {
        await axios.delete(`http://localhost:5000/api/categories/${id}`);
        fetchCategories();
      },
    });
  };

  const columns = [
    { title: "Name", dataIndex: "name" },
    {
      title: "Color",
      render: (_, r) => (
        <Tag color={r.color} style={{ padding: "3px 10px" }}>
          {r.color}
        </Tag>
      ),
    },
    {
      title: "Action",
      render: (_, r) => (
        <Space>
          <Button type="text" icon={<EditOutlined />} onClick={() => {
            setEditing(r);
            setOpen(true);
            form.setFieldsValue(r);
          }} />
          <Button type="text" danger icon={<DeleteOutlined />} onClick={() => remove(r.id)} />
        </Space>
      ),
    },
  ];

  return (
    <Content style={{ padding: 20 }}>
      <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>
        Add Category
      </Button>

      <Table columns={columns} dataSource={categories} rowKey="id" scroll={{ x: "max-content" }} />

      <Modal
        title={editing ? "Edit Category" : "Add Category"}
        open={open}
        onOk={save}
        onCancel={() => { setOpen(false); form.resetFields(); setEditing(null); }}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="color" label="Color" rules={[{ required: true }]}>
            <Input type="color" />
          </Form.Item>
        </Form>
      </Modal>
    </Content>
  );
}
