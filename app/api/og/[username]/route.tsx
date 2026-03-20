import { ImageResponse } from "next/og";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;

  let name = username;
  let bio = "";
  let imageUrl = "";
  let linkTitles: string[] = [];
  let linkCount = 0;

  try {
    const [user, links] = await Promise.all([
      fetchQuery(api.users.getUserByUsername, { username }),
      fetchQuery(api.links.listByUsername, { username }),
    ]);

    if (user) {
      name = user.name || user.username || username;
      bio = user.bio || "";
      imageUrl = (user.image as string) || "";
    }
    if (links) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      linkTitles = (links as any[]).slice(0, 3).map((l) => l.title as string);
      linkCount = links.length;
    }
  } catch {
    // Use defaults on error
  }

  const initials = name.slice(0, 2).toUpperCase();
  const bioPrev = bio.length > 100 ? bio.slice(0, 100) + "…" : bio;

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#09090b",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          paddingLeft: "88px",
          paddingRight: "80px",
          overflow: "hidden",
        }}
      >
        {/* Background glow behind the card */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "520px",
            height: "630px",
            background:
              "radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.06) 0%, transparent 65%)",
            display: "flex",
          }}
        />

        {/* ── LEFT: SocialCard mockup ── */}
        <div
          style={{
            width: "295px",
            background: "rgba(255,255,255,0.97)",
            borderRadius: "20px",
            border: "1px solid rgba(229,231,235,0.5)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          {/* Card top row: logo chip + title */}
          <div
            style={{
              padding: "18px 18px 10px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <div
                style={{
                  width: "26px",
                  height: "26px",
                  borderRadius: "6px",
                  background: "#f4f4f5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "10px",
                  fontWeight: 700,
                  color: "#71717a",
                }}
              >
                L
              </div>
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background: "#e5e7eb",
                  marginLeft: "8px",
                  display: "flex",
                }}
              />
            </div>
            <div
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#111827",
              }}
            >
              {name + "'s Linkroot"}
            </div>
            <div
              style={{
                width: "32px",
                height: "2px",
                background: "#d1d5db",
                marginTop: "5px",
                display: "flex",
              }}
            />
          </div>

          {/* Profile photo + name */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "6px 18px 14px",
            }}
          >
            {imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageUrl}
                width={84}
                height={84}
                style={{
                  borderRadius: "14px",
                  objectFit: "cover",
                  border: "3px solid white",
                }}
                alt={name}
              />
            ) : (
              <div
                style={{
                  width: "84px",
                  height: "84px",
                  borderRadius: "14px",
                  background: "#f4f4f5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "26px",
                  color: "#71717a",
                  fontWeight: 600,
                }}
              >
                {initials}
              </div>
            )}
            <div
              style={{
                marginTop: "10px",
                fontSize: "14px",
                fontWeight: 600,
                color: "#111827",
              }}
            >
              {name}
            </div>
          </div>

          {/* Connect-with-me panel (open state) */}
          <div
            style={{
              borderTop: "1px solid #f0f0f0",
              padding: "10px 14px 14px",
              display: "flex",
              flexDirection: "column",
              background: "#ffffff",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <span
                style={{ fontSize: "11px", fontWeight: 600, color: "#111827" }}
              >
                Connect with me
              </span>
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  background: "#111827",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "9px",
                  color: "#ffffff",
                }}
              >
                ↑
              </div>
            </div>
            {bio && (
              <div
                style={{
                  fontSize: "9px",
                  color: "#6b7280",
                  lineHeight: 1.5,
                  marginBottom: "7px",
                }}
              >
                {bio.length > 65 ? bio.slice(0, 65) + "…" : bio}
              </div>
            )}
            {linkTitles.map((title, i) => (
              <div
                key={i}
                style={{
                  height: "30px",
                  background: "#f9fafb",
                  borderRadius: "8px",
                  border: "1px solid rgba(229,231,235,0.9)",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "10px",
                  marginBottom: i < linkTitles.length - 1 ? "5px" : 0,
                  fontSize: "10px",
                  fontWeight: 500,
                  color: "#374151",
                }}
              >
                {title}
              </div>
            ))}
            {linkTitles.length === 0 && (
              <div
                style={{
                  fontSize: "10px",
                  color: "#9ca3af",
                  textAlign: "center",
                  padding: "6px 0",
                }}
              >
                No links yet
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT: Profile info text ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "64px",
            flex: 1,
          }}
        >
          <div
            style={{
              fontSize: "13px",
              color: "#3f3f46",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "20px",
            }}
          >
            linkroot.space
          </div>
          <div
            style={{
              fontSize: "58px",
              fontWeight: 800,
              color: "#fafafa",
              letterSpacing: "-2px",
              lineHeight: 1.05,
              marginBottom: "20px",
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontSize: "20px",
              color: "#71717a",
              lineHeight: 1.55,
              maxWidth: "440px",
            }}
          >
            {bioPrev || `Check out ${name}'s links on Linkroot.`}
          </div>
          {linkCount > 0 && (
            <div
              style={{
                marginTop: "32px",
                display: "flex",
                alignItems: "center",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.09)",
                borderRadius: "100px",
                paddingTop: "9px",
                paddingBottom: "9px",
                paddingLeft: "20px",
                paddingRight: "20px",
              }}
            >
              <span style={{ fontSize: "15px", color: "#71717a" }}>
                {linkCount} {linkCount === 1 ? "link" : "links"}
              </span>
            </div>
          )}
        </div>

        {/* Bottom-right corner branding */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            right: "44px",
            fontSize: "13px",
            color: "#3f3f46",
            letterSpacing: "0.04em",
          }}
        >
          linkroot.space
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
