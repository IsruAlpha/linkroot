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
      linkCount = links.length;
    }
  } catch {
    // Use defaults on error
  }

  const initials = name.slice(0, 2).toUpperCase();
  const truncatedBio =
    bio.length > 110 ? bio.slice(0, 110) + "…" : bio;

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#09090b",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Radial glow at top */}
        <div
          style={{
            position: "absolute",
            top: "-180px",
            left: "50%",
            width: "900px",
            height: "500px",
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.055) 0%, transparent 65%)",
            transform: "translateX(-50%)",
            display: "flex",
          }}
        />

        {/* Subtle bottom glow */}
        <div
          style={{
            position: "absolute",
            bottom: "-200px",
            left: "50%",
            width: "700px",
            height: "400px",
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.025) 0%, transparent 70%)",
            transform: "translateX(-50%)",
            display: "flex",
          }}
        />

        {/* Top-right branding */}
        <div
          style={{
            position: "absolute",
            top: "36px",
            right: "44px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color: "#3f3f46",
            fontSize: "17px",
            fontWeight: "500",
            letterSpacing: "0.04em",
          }}
        >
          linkroot.space
        </div>

        {/* Profile photo */}
        <div
          style={{
            display: "flex",
            marginBottom: "28px",
          }}
        >
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              width={128}
              height={128}
              style={{
                borderRadius: "50%",
                border: "2px solid rgba(255,255,255,0.10)",
                objectFit: "cover",
              }}
              alt={name}
            />
          ) : (
            <div
              style={{
                width: "128px",
                height: "128px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.04)",
                border: "2px solid rgba(255,255,255,0.10)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#a1a1aa",
                fontSize: "36px",
                fontWeight: "600",
              }}
            >
              {initials}
            </div>
          )}
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: "52px",
            fontWeight: "700",
            color: "#fafafa",
            marginBottom: "10px",
            letterSpacing: "-1.5px",
            display: "flex",
          }}
        >
          {name}
        </div>

        {/* @username */}
        <div
          style={{
            fontSize: "22px",
            color: "#52525b",
            marginBottom: "24px",
            display: "flex",
          }}
        >
          @{username}
        </div>

        {/* Bio */}
        {truncatedBio && (
          <div
            style={{
              fontSize: "19px",
              color: "#71717a",
              maxWidth: "660px",
              textAlign: "center",
              lineHeight: "1.55",
              marginBottom: "36px",
              display: "flex",
            }}
          >
            {truncatedBio}
          </div>
        )}

        {/* Link count pill */}
        {linkCount > 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "100px",
              padding: "10px 22px",
              fontSize: "16px",
              color: "#71717a",
            }}
          >
            {linkCount} {linkCount === 1 ? "link" : "links"}
          </div>
        )}

        {/* Bottom divider line */}
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            height: "1px",
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)",
            display: "flex",
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
