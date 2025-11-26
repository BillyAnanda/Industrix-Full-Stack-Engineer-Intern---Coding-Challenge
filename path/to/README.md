---


---

<h1 id="industrix-todo-app">Industrix Todo App</h1>
<p>This is a simple Todo Management application built for a technical test.<br>
The project uses React (frontend) and Node.js + Express + PostgreSQL (backend).</p>
<p>To be honest, this is my first time using <strong>Node.js</strong>, <strong>Express</strong>, and also <strong>React</strong>.<br>
I wanted to challenge myself by learning new technologies for this project.<br>
So sorry if there are still many things that are not perfect. 😅</p>
<p>In this app, users can manage todos with categories, priorities, status, and due dates.</p>
<p>This is also my first time writing a README file,<br>
so I hope everything here is still clear and easy to understand 🙏</p>
<h2 id="features">Features</h2>
<ul>
<li>Add / Edit / Delete Todo</li>
<li>Mark todo as Done / Not Done</li>
<li>Category CRUD</li>
<li>Search Todo by title</li>
<li>Filter by Category and Priority</li>
<li>Pagination</li>
<li>Responsive UI using Ant Design</li>
<li>Show “Overdue” label when todo is late</li>
</ul>
<h2 id="tech">Tech</h2>
<h3 id="frontend">Frontend</h3>
<ul>
<li>React</li>
<li>Ant Design UI</li>
<li>Axios</li>
<li>Day.js</li>
</ul>
<h3 id="backend">Backend</h3>
<ul>
<li>Node.js + Express</li>
<li>Sequelize ORM</li>
<li>PostgreSQL</li>
</ul>
<hr>
<h2 id="installation--setup">Installation &amp; Setup</h2>
<p>All your files and folders are presented as a tree in the file explorer. You can switch from one to another by clicking a file in the tree.</p>
<h3 id="clone-project">Clone project</h3>
<p>git clone <br>
cd industrix</p>
<h2 id="backend-setup">Backend Setup</h2>
<p>cd backend<br>
npm install</p>
<h3 id="create-.env-file">Create .env File</h3>
<p>DB_HOST=localhost<br>
DB_USER=postgres<br>
DB_PASS=billyc123<br>
DB_NAME=industrix_db<br>
DB_PORT=5432</p>
<h3 id="run-database-migration">Run database migration</h3>
<p>npx sequelize-cli db:migrate</p>
<h3 id="start-backend">Start Backend</h3>
<p>npm run dev</p>
<h4 id="backend-runs-on--httplocalhost5000">Backend runs on : <a href="http://localhost:5000">http://localhost:5000</a></h4>
<h2 id="frontend-setup">Frontend Setup</h2>
<p>cd …/frontend<br>
npm install<br>
npm start</p>
<h4 id="frontend-runs-on--httplocalhost3000">Frontend runs on : <a href="http://localhost:3000">http://localhost:3000</a></h4>
<h2 id="how-to-use">How To Use</h2>
<ul>
<li>
<p>Open browser and go to <code>localhost:3000</code></p>
</li>
<li>
<p>Add Todos using the button <strong>Add Todo</strong></p>
</li>
<li>
<p>You can filter, search, and scroll</p>
</li>
<li>
<p>You can add Categories on Category page (sidebar)</p>
</li>
<li>
<p>Change status by clicking “Done / Not Done”</p>
</li>
</ul>
<h2 id="how-to-run-tests">How To Run Tests</h2>
<p>Tests not implemented yet 😅</p>
<h2 id="api-endpoints">API Endpoints</h2>
<h3 id="todo-api">Todo API</h3>
<p>GET <code>/api/todos</code> Get all todos (with pagination &amp; filter)</p>
<p>GET <code>/api/todos/:id</code> Get single todo</p>
<p>POST <code>/api/todos</code> Create todo</p>
<p>PUT <code>/api/todos/:id</code> Update todo</p>
<p>DELETE <code>/api/todos/:id</code> Delete todo</p>
<p>PATCH <code>/api/todos/:id/toggle</code> Toggle completed</p>
<h3 id="category-api">Category API</h3>
<p>GET <code>/api/categories</code> Get all categories</p>
<p>POST <code>/api/categories</code> Create category</p>
<p>PUT <code>/api/categories/:id</code> Update</p>
<p>DELETE <code>/api/categories/:id</code> Delete</p>
<h1 id="database-design">Database Design</h1>
<h2 id="todos">Todos</h2>
<p>id ‘INT’ ‘Primary Key’</p>
<p>title ‘STRING’ ‘Todo title’</p>
<p>description ‘STRING’ ‘Optional’</p>
<p>completed ‘BOOLEAN’ ‘Todo status’</p>
<p>priority ‘STRING’ ‘high/medium/low’</p>
<p>due_date ‘DATE’ ‘Deadline’</p>
<p>category_id ‘INT’ ‘FK to categories’</p>
<p>created_at ‘TIMESTAMP’ ‘Created time’</p>
<p>updated_at ‘TIMESTAMP’ ‘Updated time’</p>
<h2 id="categories">Categories</h2>
<p>id ‘INT’ ‘Primary Key’</p>
<p>name ‘STRING’ ‘Category name’</p>
<p>color ‘STRING’ ‘Color for UI tag’</p>
<h3 id="relationship">Relationship</h3>
<ul>
<li>
<p><strong>1 Category has many Todos</strong></p>
</li>
<li>
<p><strong>1 Todo belongs to 1 Category</strong></p>
</li>
</ul>
<p>I choose this because it is simple and enough for the business flow</p>
<h2 id="technical-decisions-questions">Technical Decisions Questions</h2>
<h3 id="how-did-you-implement-responsive-design">How did you implement responsive design?</h3>
<p>I used responsive layout from <strong>Ant Design</strong> and a small custom CSS file.</p>
<ul>
<li>
<p><strong>Breakpoints</strong>: I used the default Ant Design breakpoints (<code>lg</code>, <code>md</code>, <code>sm</code>)<br>
because they already work well for desktop, tablet, and mobile.</p>
</li>
<li>
<p><strong>UI behavior</strong>:</p>
<ul>
<li>
<p>Sidebar collapses when screen is smaller</p>
</li>
<li>
<p>Table scrolls horizontally on small devices</p>
</li>
<li>
<p>Filter buttons wrap into multiple rows using <code>Space wrap</code></p>
</li>
</ul>
</li>
<li>
<p><strong>Ant Design components that helped</strong>:</p>
<ul>
<li>
<p><code>Layout</code> (flexible layout)</p>
</li>
<li>
<p><code>Table</code> with <code>scroll={{ x: "max-content" }}</code></p>
</li>
<li>
<p><code>Space</code> with <code>wrap</code> for responsiveness</p>
</li>
<li>
<p><code>Sider</code> with <code>breakpoint="lg"</code> to auto collapse</p>
</li>
</ul>
</li>
</ul>
<p>So the app still looks clean even on smaller screens.</p>
<h3 id="how-did-you-structure-your-react-components">How did you structure your React components?</h3>
<p>I keep the structure simple and clean because I am still learning React.</p>
<p>Component hierarchy:</p>
<p>App.js<br>
TodoPage (Todo CRUD + Filters + Pagination)<br>
CategoryPage (Category CRUD)</p>
<ul>
<li>
<p>The global state for categories uses <strong>React Context</strong><br>
→ so both pages can access category data</p>
</li>
<li>
<p>Todo filters and pagination are handled inside <strong>TodoPage</strong><br>
→ so only that component re-renders when needed</p>
</li>
</ul>
<p>I think this structure is easy to understand for a beginner like me.</p>
<h3 id="what-backend-architecture-did-you-choose-and-why">What backend architecture did you choose and why?</h3>
<p>I used a simple structure based on MVC idea:<br>
src/<br>
models/<br>
controllers/<br>
routes/<br>
server.js</p>
<ul>
<li>
<p>routes/ → define API endpoints</p>
</li>
<li>
<p>controllers/ → business logic like filter, pagination, error handling</p>
</li>
<li>
<p>models/→ Sequelize models for Todo &amp; Category</p>
</li>
</ul>
<p>I chose this because it is simple and common in tutorials,<br>
so easier for me to learn and fix bugs.</p>
<h3 id="error-handling">Error handling</h3>
<ul>
<li>
<p>I return JSON error responses with status codes</p>
</li>
<li>
<p>I use <code>try/catch</code> on every controller method to avoid server crash</p>
</li>
</ul>
<h3 id="how-did-you-handle-data-validation">How did you handle data validation?</h3>
<p>I validate on <strong>both</strong> frontend and backend:</p>
<p>Frontend<br>
required fields in Form (title, name, color)</p>
<p>Backend<br>
database constraints + validate category &amp; priority</p>
<p>Why both?<br>
Because frontend makes UX better, backend keeps data safe.</p>
<h3 id="what-did-you-choose-to-unit-test-and-why">What did you choose to unit test and why?</h3>
<p>I only wrote small test logic (manual testing), because this is my first time building full stack with Node &amp; React.</p>
<p>If I had more time, I would test:</p>
<ul>
<li>
<p>Toggle status controller</p>
</li>
<li>
<p>Pagination logic</p>
</li>
<li>
<p>Filtering query</p>
</li>
</ul>
<p>Edge cases I considered manually:</p>
<ul>
<li>
<p>Search with no result</p>
</li>
<li>
<p>Filter invalid category</p>
</li>
<li>
<p>Due date empty</p>
</li>
<li>
<p>Delete while filter active</p>
</li>
</ul>
<p><em>So sorry, testing is still basic<br>
but I want to learn more in the future.</em></p>
<h4 id="if-you-had-more-time-what-would-you-improve-or-add"><strong>If you had more time, what would you improve or add?</strong></h4>
<p>If I could continue this project:</p>
<p><strong>Improvements</strong></p>
<ul>
<li>
<p>Better UI styling</p>
</li>
<li>
<p>Add Auth (Login + Roles)</p>
</li>
</ul>
<p><strong>New features</strong></p>
<ul>
<li>
<p>Sorting todos column headers</p>
</li>
<li>
<p>Drag to reorder todos</p>
</li>
</ul>

