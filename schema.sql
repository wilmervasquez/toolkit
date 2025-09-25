--
-- PostgreSQL database dump
--

-- Dumped from database version 14.18 (Ubuntu 14.18-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.18 (Ubuntu 14.18-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: Ventas; Type: SCHEMA; Schema: -; Owner: wilmervasquez
--

CREATE SCHEMA "Ventas";


ALTER SCHEMA "Ventas" OWNER TO wilmervasquez;

--
-- Name: Ventasu; Type: SCHEMA; Schema: -; Owner: wilmervasquez
--

CREATE SCHEMA "Ventasu";


ALTER SCHEMA "Ventasu" OWNER TO wilmervasquez;

--
-- Name: june; Type: SCHEMA; Schema: -; Owner: wilmervasquez
--

CREATE SCHEMA june;


ALTER SCHEMA june OWNER TO wilmervasquez;

--
-- Name: junex; Type: SCHEMA; Schema: -; Owner: wilmervasquez
--

CREATE SCHEMA junex;


ALTER SCHEMA junex OWNER TO wilmervasquez;

--
-- Name: ventas; Type: SCHEMA; Schema: -; Owner: wilmervasquez
--

CREATE SCHEMA ventas;


ALTER SCHEMA ventas OWNER TO wilmervasquez;

--
-- Name: AppointmentStatus; Type: TYPE; Schema: public; Owner: wilmervasquez
--

CREATE TYPE public."AppointmentStatus" AS ENUM (
    'PENDING',
    'CONFIRMED',
    'COMPLETED',
    'CANCELED'
);


ALTER TYPE public."AppointmentStatus" OWNER TO wilmervasquez;

--
-- Name: Gender; Type: TYPE; Schema: public; Owner: wilmervasquez
--

CREATE TYPE public."Gender" AS ENUM (
    'MALE',
    'FEMALE'
);


ALTER TYPE public."Gender" OWNER TO wilmervasquez;

--
-- Name: InvoiceStatus; Type: TYPE; Schema: public; Owner: wilmervasquez
--

CREATE TYPE public."InvoiceStatus" AS ENUM (
    'PENDING',
    'PAID',
    'FAILED'
);


ALTER TYPE public."InvoiceStatus" OWNER TO wilmervasquez;

--
-- Name: estado_orden; Type: TYPE; Schema: ventas; Owner: wilmervasquez
--

CREATE TYPE ventas.estado_orden AS ENUM (
    'pendiente',
    'procesando',
    'completado'
);


ALTER TYPE ventas.estado_orden OWNER TO wilmervasquez;

--
-- Name: persona_tipo; Type: TYPE; Schema: ventas; Owner: wilmervasquez
--

CREATE TYPE ventas.persona_tipo AS (
	nombre text,
	edad integer
);


ALTER TYPE ventas.persona_tipo OWNER TO wilmervasquez;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Appointment; Type: TABLE; Schema: public; Owner: wilmervasquez
--

CREATE TABLE public."Appointment" (
    id text NOT NULL,
    date timestamp(3) without time zone NOT NULL,
    status public."AppointmentStatus" DEFAULT 'PENDING'::public."AppointmentStatus" NOT NULL,
    notes text,
    "doctorId" text NOT NULL,
    "patientId" text NOT NULL,
    "slotId" text NOT NULL
);


ALTER TABLE public."Appointment" OWNER TO wilmervasquez;

--
-- Name: Attendance; Type: TABLE; Schema: public; Owner: wilmervasquez
--

CREATE TABLE public."Attendance" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "checkIn" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "checkOut" timestamp(3) without time zone,
    status text DEFAULT 'Present'::text NOT NULL
);


ALTER TABLE public."Attendance" OWNER TO wilmervasquez;

--
-- Name: Bookmark; Type: TABLE; Schema: public; Owner: wilmervasquez
--

CREATE TABLE public."Bookmark" (
    id integer NOT NULL,
    guid text NOT NULL,
    name text NOT NULL,
    url text,
    "dateAdded" timestamp(3) without time zone NOT NULL,
    "dateLastUsed" timestamp(3) without time zone NOT NULL,
    "folderId" integer NOT NULL
);


ALTER TABLE public."Bookmark" OWNER TO wilmervasquez;

--
-- Name: BookmarkFolder; Type: TABLE; Schema: public; Owner: wilmervasquez
--

CREATE TABLE public."BookmarkFolder" (
    id integer NOT NULL,
    guid text NOT NULL,
    name text NOT NULL,
    "dateAdded" timestamp(3) without time zone NOT NULL,
    "dateLastUsed" timestamp(3) without time zone NOT NULL,
    "dateModified" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."BookmarkFolder" OWNER TO wilmervasquez;

--
-- Name: Course; Type: TABLE; Schema: public; Owner: wilmervasquez
--

CREATE TABLE public."Course" (
    id integer NOT NULL,
    name text NOT NULL,
    cycle integer NOT NULL,
    color text DEFAULT '#888888'::text NOT NULL
);


ALTER TABLE public."Course" OWNER TO wilmervasquez;

--
-- Name: Course_id_seq; Type: SEQUENCE; Schema: public; Owner: wilmervasquez
--

CREATE SEQUENCE public."Course_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Course_id_seq" OWNER TO wilmervasquez;

--
-- Name: Course_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: wilmervasquez
--

ALTER SEQUENCE public."Course_id_seq" OWNED BY public."Course".id;


--
-- Name: Doctor; Type: TABLE; Schema: public; Owner: wilmervasquez
--

CREATE TABLE public."Doctor" (
    id text NOT NULL,
    specialty text NOT NULL,
    "licenseNumber" text NOT NULL,
    bio text,
    "clinicName" text,
    address text,
    "organizationId" text
);


ALTER TABLE public."Doctor" OWNER TO wilmervasquez;

--
-- Name: Invoice; Type: TABLE; Schema: public; Owner: wilmervasquez
--

CREATE TABLE public."Invoice" (
    id text NOT NULL,
    amount double precision NOT NULL,
    status public."InvoiceStatus" DEFAULT 'PENDING'::public."InvoiceStatus" NOT NULL,
    "appointmentId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "userId" text NOT NULL
);


ALTER TABLE public."Invoice" OWNER TO wilmervasquez;

--
-- Name: MedicalRecord; Type: TABLE; Schema: public; Owner: wilmervasquez
--

CREATE TABLE public."MedicalRecord" (
    id text NOT NULL,
    "patientId" text NOT NULL,
    date timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    description text NOT NULL,
    prescription text
);


ALTER TABLE public."MedicalRecord" OWNER TO wilmervasquez;

--
-- Name: Message; Type: TABLE; Schema: public; Owner: wilmervasquez
--

CREATE TABLE public."Message" (
    id text NOT NULL,
    "senderId" text NOT NULL,
    "receiverId" text NOT NULL,
    content text NOT NULL,
    "timestamp" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Message" OWNER TO wilmervasquez;

--
-- Name: Order; Type: TABLE; Schema: public; Owner: wilmervasquez
--

CREATE TABLE public."Order" (
    id integer NOT NULL,
    "userId" text NOT NULL,
    "orderDate" timestamp(3) without time zone NOT NULL,
    status character varying(20) NOT NULL,
    "totalAmount" numeric(10,2) NOT NULL,
    "shippingAddress" character varying(255) NOT NULL,
    "paymentStatus" character varying(20) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Order" OWNER TO wilmervasquez;

--
-- Name: Order_id_seq; Type: SEQUENCE; Schema: public; Owner: wilmervasquez
--

CREATE SEQUENCE public."Order_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Order_id_seq" OWNER TO wilmervasquez;

--
-- Name: Order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: wilmervasquez
--

ALTER SEQUENCE public."Order_id_seq" OWNED BY public."Order".id;


--
-- Name: Organization; Type: TABLE; Schema: public; Owner: wilmervasquez
--

CREATE TABLE public."Organization" (
    id text NOT NULL,
    name text NOT NULL,
    ruc text NOT NULL,
    address text,
    "ownerId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Organization" OWNER TO wilmervasquez;

--
-- Name: PasswordResetToken; Type: TABLE; Schema: public; Owner: wilmervasquez
--

CREATE TABLE public."PasswordResetToken" (
    "userId" text NOT NULL,
    "tokenHash" text NOT NULL,
    "expiresAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."PasswordResetToken" OWNER TO wilmervasquez;

--
-- Name: Patient; Type: TABLE; Schema: public; Owner: wilmervasquez
--

CREATE TABLE public."Patient" (
    id text NOT NULL,
    "birthDate" timestamp(3) without time zone NOT NULL,
    gender public."Gender" NOT NULL
);


ALTER TABLE public."Patient" OWNER TO wilmervasquez;

--
-- Name: Payment; Type: TABLE; Schema: public; Owner: wilmervasquez
--

CREATE TABLE public."Payment" (
    id integer NOT NULL,
    "orderId" integer NOT NULL,
    method character varying(50) NOT NULL,
    date timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    amount numeric(10,2) NOT NULL,
    "transactionId" character varying(50) NOT NULL,
    status character varying(50) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Payment" OWNER TO wilmervasquez;

--
-- Name: Payment_id_seq; Type: SEQUENCE; Schema: public; Owner: wilmervasquez
--

CREATE SEQUENCE public."Payment_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Payment_id_seq" OWNER TO wilmervasquez;

--
-- Name: Payment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: wilmervasquez
--

ALTER SEQUENCE public."Payment_id_seq" OWNED BY public."Payment".id;


--
-- Name: Product; Type: TABLE; Schema: public; Owner: wilmervasquez
--

CREATE TABLE public."Product" (
    id integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    price integer DEFAULT 0 NOT NULL,
    "userId" text NOT NULL,
    "categoryId" integer NOT NULL,
    stock integer DEFAULT 0 NOT NULL,
    sku text,
    "imageUrl" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Product" OWNER TO wilmervasquez;

--
-- Name: ProductCategory; Type: TABLE; Schema: public; Owner: wilmervasquez
--

CREATE TABLE public."ProductCategory" (
    id integer NOT NULL,
    name text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."ProductCategory" OWNER TO wilmervasquez;

--
-- Name: ProductCategory_id_seq; Type: SEQUENCE; Schema: public; Owner: wilmervasquez
--

CREATE SEQUENCE public."ProductCategory_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ProductCategory_id_seq" OWNER TO wilmervasquez;

--
-- Name: ProductCategory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: wilmervasquez
--

ALTER SEQUENCE public."ProductCategory_id_seq" OWNED BY public."ProductCategory".id;


--
-- Name: Product_id_seq; Type: SEQUENCE; Schema: public; Owner: wilmervasquez
--

CREATE SEQUENCE public."Product_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Product_id_seq" OWNER TO wilmervasquez;

--
-- Name: Product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: wilmervasquez
--

ALTER SEQUENCE public."Product_id_seq" OWNED BY public."Product".id;


--
-- Name: Project; Type: TABLE; Schema: public; Owner: wilmervasquez
--

CREATE TABLE public."Project" (
    id text NOT NULL,
    name text NOT NULL,
    description text,
    status text NOT NULL,
    "startDate" timestamp(3) without time zone NOT NULL,
    "endDate" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Project" OWNER TO wilmervasquez;

--
-- Name: Role; Type: TABLE; Schema: public; Owner: wilmervasquez
--

CREATE TABLE public."Role" (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."Role" OWNER TO wilmervasquez;

--
-- Name: Role_id_seq; Type: SEQUENCE; Schema: public; Owner: wilmervasquez
--

CREATE SEQUENCE public."Role_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Role_id_seq" OWNER TO wilmervasquez;

--
-- Name: Role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: wilmervasquez
--

ALTER SEQUENCE public."Role_id_seq" OWNED BY public."Role".id;


--
-- Name: Schedule; Type: TABLE; Schema: public; Owner: wilmervasquez
--

CREATE TABLE public."Schedule" (
    id integer NOT NULL,
    day text NOT NULL,
    "timeStart" text NOT NULL,
    "timeEnd" text NOT NULL,
    section text NOT NULL,
    "courseId" integer NOT NULL,
    location text
);


ALTER TABLE public."Schedule" OWNER TO wilmervasquez;

--
-- Name: Schedule_id_seq; Type: SEQUENCE; Schema: public; Owner: wilmervasquez
--

CREATE SEQUENCE public."Schedule_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Schedule_id_seq" OWNER TO wilmervasquez;

--
-- Name: Schedule_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: wilmervasquez
--

ALTER SEQUENCE public."Schedule_id_seq" OWNED BY public."Schedule".id;


--
-- Name: Session; Type: TABLE; Schema: public; Owner: wilmervasquez
--

CREATE TABLE public."Session" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "userAgent" text NOT NULL,
    "ipAddress" text NOT NULL,
    "expiresAt" timestamp(3) without time zone NOT NULL,
    "lastActiveAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Session" OWNER TO wilmervasquez;

--
-- Name: Slot; Type: TABLE; Schema: public; Owner: wilmervasquez
--

CREATE TABLE public."Slot" (
    id text NOT NULL,
    "startTime" timestamp(3) without time zone NOT NULL,
    "endTime" timestamp(3) without time zone NOT NULL,
    "doctorId" text NOT NULL,
    "isBooked" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Slot" OWNER TO wilmervasquez;

--
-- Name: User; Type: TABLE; Schema: public; Owner: wilmervasquez
--

CREATE TABLE public."User" (
    id text NOT NULL,
    name character varying(50),
    "lastName" character varying(50),
    username character varying(50) NOT NULL,
    email text NOT NULL,
    "passwordHash" text,
    phone character varying(50),
    age integer,
    gender public."Gender",
    "avatarUrl" text,
    provider text DEFAULT 'email'::text NOT NULL,
    "providerId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."User" OWNER TO wilmervasquez;

--
-- Name: UserRole; Type: TABLE; Schema: public; Owner: wilmervasquez
--

CREATE TABLE public."UserRole" (
    "userId" text NOT NULL,
    "roleId" integer NOT NULL
);


ALTER TABLE public."UserRole" OWNER TO wilmervasquez;

--
-- Name: Visit; Type: TABLE; Schema: public; Owner: wilmervasquez
--

CREATE TABLE public."Visit" (
    id integer NOT NULL,
    "ipAddress" text NOT NULL,
    method text NOT NULL,
    status integer NOT NULL,
    "time" numeric(6,2) NOT NULL,
    url text NOT NULL,
    "userAgent" text NOT NULL,
    "visitedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "userId" text
);


ALTER TABLE public."Visit" OWNER TO wilmervasquez;

--
-- Name: Visit_id_seq; Type: SEQUENCE; Schema: public; Owner: wilmervasquez
--

CREATE SEQUENCE public."Visit_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Visit_id_seq" OWNER TO wilmervasquez;

--
-- Name: Visit_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: wilmervasquez
--

ALTER SEQUENCE public."Visit_id_seq" OWNED BY public."Visit".id;


--
-- Name: _ProjectToUser; Type: TABLE; Schema: public; Owner: wilmervasquez
--

CREATE TABLE public."_ProjectToUser" (
    "A" text NOT NULL,
    "B" text NOT NULL
);


ALTER TABLE public."_ProjectToUser" OWNER TO wilmervasquez;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: wilmervasquez
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO wilmervasquez;

--
-- Name: doctor; Type: VIEW; Schema: public; Owner: wilmervasquez
--

CREATE VIEW public.doctor AS
 SELECT "Doctor".id,
    "Doctor".specialty,
    "Doctor"."licenseNumber",
    "Doctor".bio,
    "Doctor"."clinicName",
    "Doctor".address,
    "Doctor"."organizationId"
   FROM public."Doctor";


ALTER TABLE public.doctor OWNER TO wilmervasquez;

--
-- Name: Course id; Type: DEFAULT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."Course" ALTER COLUMN id SET DEFAULT nextval('public."Course_id_seq"'::regclass);


--
-- Name: Order id; Type: DEFAULT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."Order" ALTER COLUMN id SET DEFAULT nextval('public."Order_id_seq"'::regclass);


--
-- Name: Payment id; Type: DEFAULT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."Payment" ALTER COLUMN id SET DEFAULT nextval('public."Payment_id_seq"'::regclass);


--
-- Name: Product id; Type: DEFAULT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."Product" ALTER COLUMN id SET DEFAULT nextval('public."Product_id_seq"'::regclass);


--
-- Name: ProductCategory id; Type: DEFAULT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."ProductCategory" ALTER COLUMN id SET DEFAULT nextval('public."ProductCategory_id_seq"'::regclass);


--
-- Name: Role id; Type: DEFAULT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."Role" ALTER COLUMN id SET DEFAULT nextval('public."Role_id_seq"'::regclass);


--
-- Name: Schedule id; Type: DEFAULT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."Schedule" ALTER COLUMN id SET DEFAULT nextval('public."Schedule_id_seq"'::regclass);


--
-- Name: Visit id; Type: DEFAULT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."Visit" ALTER COLUMN id SET DEFAULT nextval('public."Visit_id_seq"'::regclass);


--
-- Name: Appointment Appointment_pkey; Type: CONSTRAINT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."Appointment"
    ADD CONSTRAINT "Appointment_pkey" PRIMARY KEY (id);


--
-- Name: Attendance Attendance_pkey; Type: CONSTRAINT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."Attendance"
    ADD CONSTRAINT "Attendance_pkey" PRIMARY KEY (id);


--
-- Name: BookmarkFolder BookmarkFolder_pkey; Type: CONSTRAINT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."BookmarkFolder"
    ADD CONSTRAINT "BookmarkFolder_pkey" PRIMARY KEY (id);


--
-- Name: Bookmark Bookmark_pkey; Type: CONSTRAINT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."Bookmark"
    ADD CONSTRAINT "Bookmark_pkey" PRIMARY KEY (id);


--
-- Name: Course Course_pkey; Type: CONSTRAINT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."Course"
    ADD CONSTRAINT "Course_pkey" PRIMARY KEY (id);


--
-- Name: Doctor Doctor_pkey; Type: CONSTRAINT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."Doctor"
    ADD CONSTRAINT "Doctor_pkey" PRIMARY KEY (id);


--
-- Name: Invoice Invoice_pkey; Type: CONSTRAINT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."Invoice"
    ADD CONSTRAINT "Invoice_pkey" PRIMARY KEY (id);


--
-- Name: MedicalRecord MedicalRecord_pkey; Type: CONSTRAINT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."MedicalRecord"
    ADD CONSTRAINT "MedicalRecord_pkey" PRIMARY KEY (id);


--
-- Name: Message Message_pkey; Type: CONSTRAINT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT "Message_pkey" PRIMARY KEY (id);


--
-- Name: Order Order_pkey; Type: CONSTRAINT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_pkey" PRIMARY KEY (id);


--
-- Name: Organization Organization_pkey; Type: CONSTRAINT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."Organization"
    ADD CONSTRAINT "Organization_pkey" PRIMARY KEY (id);


--
-- Name: PasswordResetToken PasswordResetToken_pkey; Type: CONSTRAINT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."PasswordResetToken"
    ADD CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("userId");


--
-- Name: Patient Patient_pkey; Type: CONSTRAINT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."Patient"
    ADD CONSTRAINT "Patient_pkey" PRIMARY KEY (id);


--
-- Name: Payment Payment_pkey; Type: CONSTRAINT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."Payment"
    ADD CONSTRAINT "Payment_pkey" PRIMARY KEY (id);


--
-- Name: ProductCategory ProductCategory_pkey; Type: CONSTRAINT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."ProductCategory"
    ADD CONSTRAINT "ProductCategory_pkey" PRIMARY KEY (id);


--
-- Name: Product Product_pkey; Type: CONSTRAINT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (id);


--
-- Name: Project Project_pkey; Type: CONSTRAINT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Project_pkey" PRIMARY KEY (id);


--
-- Name: Role Role_pkey; Type: CONSTRAINT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."Role"
    ADD CONSTRAINT "Role_pkey" PRIMARY KEY (id);


--
-- Name: Schedule Schedule_pkey; Type: CONSTRAINT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."Schedule"
    ADD CONSTRAINT "Schedule_pkey" PRIMARY KEY (id);


--
-- Name: Session Session_pkey; Type: CONSTRAINT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_pkey" PRIMARY KEY (id);


--
-- Name: Slot Slot_pkey; Type: CONSTRAINT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."Slot"
    ADD CONSTRAINT "Slot_pkey" PRIMARY KEY (id);


--
-- Name: UserRole UserRole_pkey; Type: CONSTRAINT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."UserRole"
    ADD CONSTRAINT "UserRole_pkey" PRIMARY KEY ("userId", "roleId");


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: Visit Visit_pkey; Type: CONSTRAINT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."Visit"
    ADD CONSTRAINT "Visit_pkey" PRIMARY KEY (id);


--
-- Name: _ProjectToUser _ProjectToUser_AB_pkey; Type: CONSTRAINT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."_ProjectToUser"
    ADD CONSTRAINT "_ProjectToUser_AB_pkey" PRIMARY KEY ("A", "B");


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Appointment_slotId_key; Type: INDEX; Schema: public; Owner: wilmervasquez
--

CREATE UNIQUE INDEX "Appointment_slotId_key" ON public."Appointment" USING btree ("slotId");


--
-- Name: BookmarkFolder_guid_key; Type: INDEX; Schema: public; Owner: wilmervasquez
--

CREATE UNIQUE INDEX "BookmarkFolder_guid_key" ON public."BookmarkFolder" USING btree (guid);


--
-- Name: Bookmark_guid_key; Type: INDEX; Schema: public; Owner: wilmervasquez
--

CREATE UNIQUE INDEX "Bookmark_guid_key" ON public."Bookmark" USING btree (guid);


--
-- Name: Course_name_key; Type: INDEX; Schema: public; Owner: wilmervasquez
--

CREATE UNIQUE INDEX "Course_name_key" ON public."Course" USING btree (name);


--
-- Name: Doctor_licenseNumber_key; Type: INDEX; Schema: public; Owner: wilmervasquez
--

CREATE UNIQUE INDEX "Doctor_licenseNumber_key" ON public."Doctor" USING btree ("licenseNumber");


--
-- Name: Invoice_appointmentId_key; Type: INDEX; Schema: public; Owner: wilmervasquez
--

CREATE UNIQUE INDEX "Invoice_appointmentId_key" ON public."Invoice" USING btree ("appointmentId");


--
-- Name: Organization_ownerId_key; Type: INDEX; Schema: public; Owner: wilmervasquez
--

CREATE UNIQUE INDEX "Organization_ownerId_key" ON public."Organization" USING btree ("ownerId");


--
-- Name: Organization_ruc_key; Type: INDEX; Schema: public; Owner: wilmervasquez
--

CREATE UNIQUE INDEX "Organization_ruc_key" ON public."Organization" USING btree (ruc);


--
-- Name: ProductCategory_name_key; Type: INDEX; Schema: public; Owner: wilmervasquez
--

CREATE UNIQUE INDEX "ProductCategory_name_key" ON public."ProductCategory" USING btree (name);


--
-- Name: Product_sku_key; Type: INDEX; Schema: public; Owner: wilmervasquez
--

CREATE UNIQUE INDEX "Product_sku_key" ON public."Product" USING btree (sku);


--
-- Name: Role_name_key; Type: INDEX; Schema: public; Owner: wilmervasquez
--

CREATE UNIQUE INDEX "Role_name_key" ON public."Role" USING btree (name);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: wilmervasquez
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_username_key; Type: INDEX; Schema: public; Owner: wilmervasquez
--

CREATE UNIQUE INDEX "User_username_key" ON public."User" USING btree (username);


--
-- Name: _ProjectToUser_B_index; Type: INDEX; Schema: public; Owner: wilmervasquez
--

CREATE INDEX "_ProjectToUser_B_index" ON public."_ProjectToUser" USING btree ("B");


--
-- Name: Appointment Appointment_doctorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."Appointment"
    ADD CONSTRAINT "Appointment_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES public."Doctor"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Appointment Appointment_patientId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."Appointment"
    ADD CONSTRAINT "Appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Appointment Appointment_slotId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."Appointment"
    ADD CONSTRAINT "Appointment_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES public."Slot"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Attendance Attendance_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."Attendance"
    ADD CONSTRAINT "Attendance_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Bookmark Bookmark_folderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."Bookmark"
    ADD CONSTRAINT "Bookmark_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES public."BookmarkFolder"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Doctor Doctor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."Doctor"
    ADD CONSTRAINT "Doctor_id_fkey" FOREIGN KEY (id) REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Doctor Doctor_organizationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."Doctor"
    ADD CONSTRAINT "Doctor_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES public."Organization"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Invoice Invoice_appointmentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."Invoice"
    ADD CONSTRAINT "Invoice_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES public."Appointment"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Invoice Invoice_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."Invoice"
    ADD CONSTRAINT "Invoice_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: MedicalRecord MedicalRecord_patientId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."MedicalRecord"
    ADD CONSTRAINT "MedicalRecord_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES public."Patient"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Message Message_receiverId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT "Message_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Message Message_senderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Order Order_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Organization Organization_ownerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."Organization"
    ADD CONSTRAINT "Organization_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: PasswordResetToken PasswordResetToken_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."PasswordResetToken"
    ADD CONSTRAINT "PasswordResetToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Patient Patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."Patient"
    ADD CONSTRAINT "Patient_id_fkey" FOREIGN KEY (id) REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Payment Payment_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."Payment"
    ADD CONSTRAINT "Payment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public."Order"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Product Product_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."ProductCategory"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Product Product_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Schedule Schedule_courseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."Schedule"
    ADD CONSTRAINT "Schedule_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES public."Course"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Session Session_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Slot Slot_doctorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."Slot"
    ADD CONSTRAINT "Slot_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES public."Doctor"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UserRole UserRole_roleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."UserRole"
    ADD CONSTRAINT "UserRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public."Role"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserRole UserRole_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."UserRole"
    ADD CONSTRAINT "UserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Visit Visit_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."Visit"
    ADD CONSTRAINT "Visit_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: _ProjectToUser _ProjectToUser_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."_ProjectToUser"
    ADD CONSTRAINT "_ProjectToUser_A_fkey" FOREIGN KEY ("A") REFERENCES public."Project"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _ProjectToUser _ProjectToUser_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: wilmervasquez
--

ALTER TABLE ONLY public."_ProjectToUser"
    ADD CONSTRAINT "_ProjectToUser_B_fkey" FOREIGN KEY ("B") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

