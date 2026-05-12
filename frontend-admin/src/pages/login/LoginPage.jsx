import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

import "../../styles/LoginPage.css";

function generateToken() {
  return `SLX-${crypto.randomUUID()}`;
}

function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin(event) {
    event.preventDefault();

    setLoading(true);
    setErrorMessage("");

    const { data, error } = await supabase
      .from("admin_users")
      .select("*")
      .eq("email", form.email)
      .eq("password", form.password)
      .eq("status", "Activo")
      .single();

    if (error || !data) {
      setLoading(false);
      setErrorMessage("Correo o clave incorrectos.");
      return;
    }

    const token = generateToken();

    await supabase
      .from("admin_users")
      .update({
        token,
        last_login: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", data.id);

    localStorage.setItem("smartlogix_token", token);
    localStorage.setItem(
      "smartlogix_user",
      JSON.stringify({
        id: data.id,
        full_name: data.full_name,
        email: data.email,
        role: data.role,
      })
    );

    setLoading(false);
    navigate("/dashboard");
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-brand">
          <div className="login-logo">SL</div>

          <span>SMARTLOGIX ERP</span>

          <h1>Bienvenido</h1>

          <p>
            Ingresa con tu cuenta administrativa para acceder al panel principal
            de SmartLogix.
          </p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <div>
            <label>Correo institucional</label>

            <input
              type="email"
              required
              placeholder="mar.guerrag@duocuc.cl"
              value={form.email}
              onChange={(event) =>
                setForm({
                  ...form,
                  email: event.target.value,
                })
              }
            />
          </div>

          <div>
            <label>Clave</label>

            <input
              type="password"
              required
              placeholder="Ingresa tu clave"
              value={form.password}
              onChange={(event) =>
                setForm({
                  ...form,
                  password: event.target.value,
                })
              }
            />
          </div>

          {errorMessage && (
            <div className="login-error">{errorMessage}</div>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Validando..." : "Ingresar al panel"}
          </button>
        </form>

        <div className="login-demo-box">
          <span>Usuarios demo</span>
          <p>mar.guerrag@duocuc.cl / 112233</p>
          <p>maf.vergara@duocuc.cl / 112233</p>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;